import { OpenRouter } from '@openrouter/sdk'
import config from '../../translation.config.js'

const {
  translatorModel,
  qualityCheckerModel,
  openRouterAPIKey
} = config.llmTranslation

const localeToLanguageName = {
  'ko': 'Korean',
  'fr': 'French'
}

const translator_system_prompt = `
You are a helpful assistant that can translate text into the target language.
You will be given a list of strings to translate. I need you to translate them and return the translations in a JSON object.
For example, if I give you the following list of strings:
["Hello, how are you?", "I'm fine, thank you.", "What is your name?"]
And the target language is Korean, You need to translate them and return the translations in a JSON object like this:
{
  "Hello, how are you?": "안녕하세요, 어떻게 지내세요?",
  "I'm fine, thank you.": "괜찮아요, 감사합니다.",
  "What is your name?": "이름이 뭐에요?"
}
There a few things to note while translating:
1. Keep all the escape characters like \n, \" etc. For example, If you were given "What does \"mincome\" mean?", you need to return "\"mincome\"이란 무엇입니까?"
2. You must not remove special segments wrapped in curly braces or pipe symbols. Below are some examples:
- "This sounds like {a_}communism{_a}." -> "마치 {a_}공산주의{_a}처럼 들립니다."
- "Why is Group Income a |strong_|voluntary system|_strong|?" -> "Group Income이 |strong_|자발적인 시스템|_strong|인 이유는 무엇인가요?"

These are segments that will be dynamically replaced in Javascript later. Be noted that these sometimes don't exist as a pair. For example,
- "There are {num} apples in the basket." -> "바구니에 {num}개의 사과가 있습니다."

When they do exist as pairs, they sometimes may be nested. For example,
- "{ul_}\n{li_}{a_}Test link{_a}{_li}\n{_ul}" -> "{ul_}\n{li_}{a_}테스트 링크{_a}{_li}\n{_ul}"

3. Do not bother to translate anything that looks like "Proper Noun" (e.g. "Group Income", "Mincome", "Github", "Gmail" etc.)

Lastly, return the translation as a JSON object without including any other text or comments, so that I can parse it directly using JSON.parse() without any sanitization.
For example, do not include \`\`\`json at the beginning or \`\`\` at the end.
`

const quality_checker_system_prompt = `
You are a helpful assistant that checks the quality of the translation done by someone else.
You will be given a JSON object where the key is the original string and the value is the translation.
Your job is to see if there is any missing translation entries and if any translation entry is not done by the rules I gave to the translator.
If you see any of the above, go ahead and complete the translation.
Below are instructions I gave to the translator(Sample translations are done in Korean, FYI).:

1. Keep all the escape characters like \n, \" etc. For example, If you were given "What does \"mincome\" mean?", you need to return "\"mincome\"이란 무엇입니까?"
2. You must not remove special segments wrapped in curly braces or pipe symbols. Below are some examples:
- "This sounds like {a_}communism{_a}." -> "마치 {a_}공산주의{_a}처럼 들립니다."
- "Why is Group Income a |strong_|voluntary system|_strong|?" -> "Group Income이 |strong_|자발적인 시스템|_strong|인 이유는 무엇인가요?"

These are segments that will be dynamically replaced in Javascript later. Be noted that these sometimes don't exist as a pair. For example,
- "There are {num} apples in the basket." -> "바구니에 {num}개의 사과가 있습니다."

When they do exist as pairs, they sometimes may be nested. For example,
- "{ul_}\n{li_}{a_}Test link{_a}{_li}\n{_ul}" -> "{ul_}\n{li_}{a_}테스트 링크{_a}{_li}\n{_ul}"

3. Do not bother to translate anything that looks like "Proper Noun" (e.g. "Group Income", "Mincome", "Github", "Gmail" etc.)

Lastly, return the translation as a JSON object without including any other text or comments, so that I can parse it directly using JSON.parse() without any sanitization.
For example, do not include \`\`\`json at the beginning or \`\`\` at the end.
`

function cleanJsonString(str) {
  // Regex looks for ```json (optional 'json') at start and ``` at end, ignoring whitespace
  return str.replace(/^\s*```(?:json)?/gm, '').replace(/```\s*$/gm, '').trim();
}

export async function translateWithLLM (strings, targetLangCode) {
  if (!openRouterAPIKey) {
    console.log(`[LLM translation] 🚫 No API key found. Either specify it directly in translation.config.js or create .env file in the root dir that has OPENROUTER_API_KEY=<api-key> entry.`)
    return {}
  }

  const openRouter = new OpenRouter({ apiKey: openRouterAPIKey })
  const languageName = localeToLanguageName[targetLangCode]

  if (!languageName) {
    // languageName is required as it is used in the user prompt of LLM API calls.
    console.log(`[LLM translation] 🚫 No language name found for locale '${targetLangCode}' localeToLanguageName in this file.`)
    return {}
  }

  try {
    const stringsLen = strings.length
    console.log(`[LLM translation] 🛠️ ${translatorModel} is translating ${stringsLen} strings into ${languageName}...`)

    // 1. ask an LLM to translate the strings
    const translatorRequest = await openRouter.chat.send({
      model: translatorModel,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: translator_system_prompt
        },
        {
          role: 'user',
          content: `Please translate the following list of strings into ${languageName} and return the translations in a JSON object:\n\n${JSON.stringify(strings, null, 2)}`
        }
      ]
    })

    const translationResult = cleanJsonString(translatorRequest.choices[0].message.content)

    console.log(`[LLM translation] 🛠️ ${qualityCheckerModel} is checking the quality of the translation...`)
    
    // 2. pass the translation result to another LLM to polish them / catch missing or inaccurate translations.
    const qualityCheckerRequest = await openRouter.chat.send({
      model: qualityCheckerModel,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content: quality_checker_system_prompt
        },
        {
          role: 'user',
          content: `Hey check the following translation(from English to ${languageName}) and return the polished version in JSON object (if you see anything to improve).
            If they are already good enough, leave them as is:\n\n${translationResult}`
        }
      ]
    })

    const qualityCheckerResult = JSON.parse(cleanJsonString(qualityCheckerRequest.choices[0].message.content))

    // Return type as JSON object is precisely stated in the system prompts, but do another basic type check here.
    if (typeof qualityCheckerResult === 'object') {
      return qualityCheckerResult
    } else {
      console.log('[LLM translation] 🚫 LLM returned an invalid response type: ', typeof qualityCheckerResult)
      return {}
    }
  } catch (e) {
    const errMsg = e.message
      ? e.message
      : e.error?.code // Open Router API error
        ? e.error
        : e

    console.log('[LLM translation] 🚫 Something went wrong. Translation aborted with below error:\n', errMsg)
    return {}
  }
}
