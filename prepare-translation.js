import fs from 'node:fs/promises'
import path from 'node:path'

const targetDirs = [
  'src/components',
  'src/pages',
  'src/layouts'
]
const targetFileExtensions = ['.vue', '.astro']
const hasTargetExtensions = fPath => targetFileExtensions.includes(path.extname(fPath))
const targetFiles = []
const testFilePath = 'src/pages/[locale]/get-started.astro'

async function recusrivelyReadDir (dirPath) {
  const list = await fs.readdir(dirPath, { withFileTypes: true })

  for (const entry of list) {
    if (entry.isFile() && hasTargetExtensions(entry.name)) {
      targetFiles.push(path.join(entry.path, entry.name))
    } else if (entry.isDirectory()) {
      recusrivelyReadDir(path.join(dirPath, entry.name))
    }
  }
}

async function extractI18nStrings (filePath) {
  const content = await fs.readFile(filePath, 'utf8')
  const results = []

  /* ==================================================
   * 1. L('...') or L("..."), optional 2nd argument
   *    - multiline-safe
   *    - ignores args after the first
   *    - wraps result with backticks
   * ================================================== */
  const lCallRegex =
    /\bL\s*\(\s*(['"`])([\s\S]*?)\1\s*(?:,|\))/g;

  for (const match of content.matchAll(lCallRegex)) {
    const text = match[2]
    results.push(`\`${text}\``)
  }

  /* ==================================================
   * 2. <I18n ...>...</I18n> (case-insensitive)
   *    - multiline open + content
   *    - trim trailing whitespace only
   *    - wrap with backticks
   * ================================================== */
  const i18nTagRegex =
    /<i18n\b[\s\S]*?>([\s\S]*?)<\/i18n>/gi;

  for (const match of content.matchAll(i18nTagRegex)) {
    let text = match[1];

    // Remove trailing whitespace only
    text = text.replace(/\s+$/, '')

    if (text) {
      results.push(`\`${text}\``)
    }
  }

  console.log('results:')
  console.log(results)
  return results;
}

async function extractAllTargetFiles () {
  for (const targetDir of targetDirs) {
    await recusrivelyReadDir(targetDir)
  }

  console.log('targetFiles: ', targetFiles)
}

// extractAllTargetFiles()

extractI18nStrings(testFilePath)
