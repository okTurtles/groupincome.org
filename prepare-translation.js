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
const testFilePath = 'src/pages/[locale]/get-started.astro'

async function recusrivelyReadDir (dirPath) {
  const list = await fs.readdir(dirPath, { withFileTypes: true })
  let filePathList = []

  for (const entry of list) {
    if (entry.isFile() && hasTargetExtensions(entry.name)) {
      filePathList.push(path.join(entry.path, entry.name))
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
  const strings = []

  /* ==================================================
   * 1. Check if there is area specified in the file
   *    - it is @i18n-area: <area> in the file
   * ================================================== */
  const areaRegex = /^\s*\/\/\s*@i18n-area:\s*([^\s]+)\s*$/img;

  const areaMatches = [...content.matchAll(areaRegex)]
  const area = areaMatches.length ? areaMatches[0][1] : null

  if (areaMatches.length > 1) {
    console.warn(`[i18n-warning] Multiple @i18n-area found in ${filePath}`)
  }

  /* ==================================================
   * 2. L('...') or L("..."), optional 2nd argument
   *    - multiline-safe
   *    - ignores args after the first
   * ================================================== */
  const lCallRegex =
    /\bL\s*\(\s*(['"`])((?:\\.|(?!\1)[\s\S])*)\1\s*(?:,|\))/g;

  for (const match of content.matchAll(lCallRegex)) {
    const text = match[2]
    strings.push(text)
  }

  /* ==================================================
   * 3. <I18n ...>...</I18n> (case-insensitive)
   *    - multiline open + content
   *    - trim trailing whitespace only
   * ================================================== */
  const i18nTagRegex =
    /<i18n\b[\s\S]*?>([\s\S]*?)<\/i18n>/gi;

  for (const match of content.matchAll(i18nTagRegex)) {
    let text = match[1];

    // Remove trailing whitespace only
    text = text.replace(/\s+$/, '')

    if (text) {
      strings.push(text)
    }
  }

  return strings.length === 0
    ? null
    : { area, strings }
}

async function run () {
  let allFilePaths = []
  const allEntries = {
    hasArea: [],
    noArea: []
  }

  for (const targetDir of targetDirs) {
    allFilePaths = [
      ...allFilePaths,
      ...await recusrivelyReadDir(targetDir)
    ]
  }

  for (const filePath of allFilePaths) {
    const entry = await extractI18nStrings(filePath)

    if (entry) {
      allEntries[entry.area ? 'hasArea' : 'noArea'].push(entry)
    }
  }

  /* ==================================================
   * 1. Build common table
   * ================================================== */
  const finalTable = {}

  for (const entry of allEntries.hasArea) {
    if (!finalTable[entry.area]) {
      finalTable[entry.area] = {}
    }
    
    for (const raw of entry.strings) {
      finalTable[entry.area][raw] = raw
    }
  }

  for (const entry of allEntries.noArea) {
    for (const raw of entry.strings) {
      finalTable[raw] = raw
    }
  }

  /* ==================================================
   * 2. generate JSON language tables (eg. en.json, fr.json, ko.json, etc.)
   * ================================================== */
  for (const langCode of supportedLangCodes) {
    const langJsonPath = path.resolve(`src/i18n/tables/${langCode}.json`)
    let existingTable = {}

    try {
      const rawContent = await fs.readFile(langJsonPath, 'utf8')
      existingTable = rawContent ? JSON.parse(rawContent) : {}
    }  catch {
      // file does not exist yet — start fresh
    }

    // Merge with existing table (preserve existing entries so that already translated strings are not overwritten)
    for (const [key, value] of Object.entries(finalTable)) {
      if (typeof value === 'object') {
        // For the case of area object: { [area]: { [text]: text } }
        const area = key

        for (const [nestedKey, text] of Object.entries(value)) {
          finalTable[area][nestedKey] = (area in existingTable) && existingTable[area][nestedKey]
            ? existingTable[area][nestedKey]
            : text
        }
      } else {
        // { [text]: text } part here.
        finalTable[key] = (key in existingTable)
          ? existingTable[key]
          : value
      }
    }

    // Write the final table to the file
    await fs.writeFile(langJsonPath, JSON.stringify(finalTable, null, 2) + '\n', 'utf8')
    console.log(`✅ Successfully prepared translations for ${langCode}.json`)
  }
}

run()
