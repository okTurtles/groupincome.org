import 'dotenv/config'

export default {
  supportedLangCodes: ['en', 'ko', 'fr'],
  targetDirs: [
    'src/components',
    'src/pages',
    'src/layouts'
  ],
  outputDir: 'src/i18n/tables',
  targetFileExtensions: ['.vue', '.astro'],

  // options to use LLMs to create/populate translation tables using OpenRouter API
  llmTranslation: {
    enabled: true,
    translatorModel: 'openai/gpt-5.2-chat',
    qualityCheckerModel: 'google/gemini-2.5-pro',
    // NOTE: If you choose to specify the API key directly below, Don't forget to remove this before committing
    openRouterAPIKey: process.env.OPENROUTER_API_KEY || ''
  }
}
