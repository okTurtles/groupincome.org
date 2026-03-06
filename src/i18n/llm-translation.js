import { OpenRouter } from '@openrouter/sdk'
import config from '../../translation.config.js'
import { languageDisplayNamesInEnglish } from './utils.ts'

const {
  translatorModel,
  openRouterAPIKey = ''
} = config.llmTranslation

const openRouter = new OpenRouter({ apiKey: openRouterAPIKey })
const MAX_ENTRIES_PER_REQUEST = 40

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

function cleanJsonString(str) {
  // Regex looks for ```json (optional 'json') at start and ``` at end, ignoring whitespace
  return str.replace(/^\s*```(?:json)?/gm, '').replace(/```\s*$/gm, '').trim()
}

async function callTranslatorLLM (strings, languageName) {
  const translatorRequest = await openRouter.chat.send({
    model: translatorModel,
    response_format: { type: 'json_object' },
    messages: [
      { role: 'system', content: translator_system_prompt },
      { role: 'user', content: `Please translate the following list of strings into ${languageName} and return the translations in a JSON object:\n\n${JSON.stringify(strings, null, 2)}` }
    ]
  })

  return JSON.parse(cleanJsonString(translatorRequest.choices[0].message.content))
}

export async function translateWithLLM (strings, targetLangCode) {
  if (!openRouterAPIKey) {
    console.log(`[LLM translation] 🚫 No API key found. Either specify it directly in translation.config.js or create .env file in the root dir that has OPENROUTER_API_KEY=<api-key> entry.`)
    return {}
  }

  const languageName = languageDisplayNamesInEnglish[targetLangCode]

  if (!languageName) {
    // languageName is required as it is used in the user prompt of LLM API calls.
    console.log(`[LLM translation] 🚫 No language name found for locale '${targetLangCode}'. Update languageDisplayNamesInEnglish in utils.ts.`)
    return {}
  }

  try {
    const stringsLen = strings.length
    console.log(`[LLM translation] 🛠️ ${translatorModel} is translating ${stringsLen} strings into ${languageName}...`)

    const stringChunks = []
    for (let i = 0; i < strings.length; i += MAX_ENTRIES_PER_REQUEST) {
      stringChunks.push(strings.slice(i, i + MAX_ENTRIES_PER_REQUEST))
    }

    const translationResults = await Promise.all(
      stringChunks.map(async (chunk) => {
        return await callTranslatorLLM(chunk, languageName)
      })
    )

    const mergedResult = translationResults.reduce((acc, result) => {
      return { ...acc, ...result }
    }, {})

    return mergedResult
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
