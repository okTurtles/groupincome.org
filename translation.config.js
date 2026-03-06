import 'dotenv/config'

export default {
  // language codes to generate translation tables for
  supportedLangCodes: ['en', 'ko', 'fr'],

  // directories to scan for strings to translate
  targetDirs: [
    'src/components',
    'src/pages',
    'src/layouts'
  ],

  // output directory for translation tables
  outputDir: 'src/i18n/tables',

  // file extensions to scan for strings to translate
  targetFileExtensions: ['.vue', '.astro'],

  // options to use LLMs to create/populate translation tables using OpenRouter API
  llmTranslation: {
    enabled: true,
    // model to translate strings into target language
    translatorModel: 'openai/gpt-5.2-chat',
    // NOTE: If you choose to specify the API key directly below, Don't forget to remove this before committing
    openRouterAPIKey: process.env.OPENROUTER_API_KEY || ''
  }
}
