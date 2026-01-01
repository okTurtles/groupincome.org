export default {
  supportedLangCodes: ['en', 'ko', 'fr'],
  targetDirs: [
    'src/components',
    'src/pages',
    'src/layouts'
  ],
  outputDir: 'src/i18n/tables',
  targetFileExtensions: ['.vue', '.astro'],
  llmTranslation: {
    // options to use LLMs to create/populate translation tables using OpenRouter API
    enabled: true,
    translatorModel: 'openai/gpt-5.2-chat',
    qualityCheckerModel: 'google/gemini-2.5-pro',
    openRouterAPIKey: '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' // NOTE: Don't forget to remove this before committing
  }
}
