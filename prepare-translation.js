import fs from 'node:fs/promises'
import path from 'node:path'

const supportedLangCodes = ['en', 'ko']
const targetDirs = [
  'src/components',
  'src/pages',
  'src/layouts'
]

const targetFileExtensions = ['.vue', '.astro']
const hasTargetExtensions = fPath => targetFileExtensions.includes(path.extname(fPath))

async function recusrivelyReadDir (dirPath) {
  const list = await fs.readdir(dirPath, { withFileTypes: true })
  let filePathList = []

  for (const entry of list) {
    if (entry.isFile() && hasTargetExtensions(entry.name)) {
      filePathList.push(path.join(dirPath, entry.name))
    } else if (entry.isDirectory()) {
      filePathList = [
        ...filePathList,
        ...await recusrivelyReadDir(path.join(dirPath, entry.name))
      ]
    }
  }

  return filePathList
}

async function extractI18nStrings (filePath) {
  const content = await fs.readFile(filePath, 'utf8')
  const removeWhiteSpaces = (text) => {
    return text.replace(/\s+$/, '')
      .replace(/\n[ \t]+/g, '\n')
  }
  const strings = []

  /* ==================================================
   * 1. L('...') or L("..."), optional 2nd argument
   *    - multiline-safe
   *    - ignores args after the first
   * ================================================== */
  const lCallRegex =
    /\bL\s*\(\s*(['"`])((?:\\.|(?!\1)[\s\S])*)\1\s*(?:,|\))/g;

  for (const match of content.matchAll(lCallRegex)) {
    const text = removeWhiteSpaces(match[2])

    if (text) {
      strings.push(text)
    }
  }

  /* ==================================================
   * 2. <I18n ...>...</I18n> (case-insensitive)
   *    - multiline open + content
   *    - trim trailing whitespace only
   *    - handles attributes with quoted strings and JSX expressions
   * ================================================== */
  // Match <i18n tag, then attributes (handling quotes and JSX expressions), then >, then content until </i18n>
  // Strategy: match opening tag by finding > that's not inside quotes or unclosed braces
  const i18nTagRegex =
    /<i18n\b[\s\S]*?(?:(?:(?:=(?:['"`])(?:\\.|(?!\1)[^\\])*\1|=\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*)|[^>])*?)>([\s\S]*?)<\/i18n>/gi;

  for (const match of content.matchAll(i18nTagRegex)) {
    let text = removeWhiteSpaces(match[1]).trim();

    if (text) {
      strings.push(text)
    }
  }

  return strings.length === 0
    ? null
    : { filePath, strings }
}

async function run () {
  let allFilePaths = []
  const allEntries = []

  for (const targetDir of targetDirs) {
    allFilePaths = [
      ...allFilePaths,
      ...await recusrivelyReadDir(targetDir)
    ]
  }

  for (const filePath of allFilePaths) {
    const entry = await extractI18nStrings(filePath)

    if (entry) {
      allEntries.push(entry)
    }
  }

  /* ==================================================
   * generate JSON language tables (eg. en.json, fr.json, ko.json, etc.)
   * ================================================== */

  const finalTable = {}

  for (const entry of allEntries) {
    const { strings, filePath } = entry
    let fileHasAtLeastOneString = false

    finalTable[`__________${filePath}__________`] = ""
    for (const string of strings) {
      if (!finalTable[string]) {
        fileHasAtLeastOneString = true
        finalTable[string] = string
      }
    }

    if (!fileHasAtLeastOneString) {
      delete finalTable[`__________${filePath}__________`]
    }
  }

  for (const langCode of supportedLangCodes) {
    const langJsonPath = path.resolve(`src/i18n/tables/${langCode}.json`)
    let existingTable = {}

    try {
      const rawContent = await fs.readFile(langJsonPath, 'utf8')
      existingTable = rawContent ? JSON.parse(rawContent) : {}
    }  catch {
      // file does not exist yet — start fresh
    }

    // Merge with existing table (preserve existing entries so that already translated strings are not lost)
    for (const [key, value] of Object.entries(finalTable)) {
      if (key.startsWith('___')) { continue }

      finalTable[key] = (key in existingTable)
        ? existingTable[key]
        : value
    }

    // Write the final table to the file
    await fs.writeFile(langJsonPath, JSON.stringify(finalTable, null, 2) + '\n', 'utf8')
    console.log(`✅ Successfully prepared translations for ${langCode}.json`)
  }
}

run()
