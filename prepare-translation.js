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
   *    - wraps result with backticks
   * ================================================== */
  const lCallRegex =
    /\bL\s*\(\s*(['"`])((?:\\.|(?!\1)[\s\S])*)\1\s*(?:,|\))/g;

  for (const match of content.matchAll(lCallRegex)) {
    const text = match[2]
    strings.push(`\`${text}\``)
  }

  /* ==================================================
   * 3. <I18n ...>...</I18n> (case-insensitive)
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
      strings.push(`\`${text}\``)
    }
  }

  return strings.length === 0
    ? null
    : { area, strings }
}

function serializeTable (obj, indent = 2, level = 0) {
  if (typeof obj === 'string') {
    return `\`${obj}\``
  }

  const entries = Object.entries(obj)

  if (entries.length === 0) {
    return '{}'
  }

  const padBeforeParenthesis = ' '.repeat(level * indent) // indentation for opening/closing parenthesis of current object
  const padBeforeEachKey = ' '.repeat((level + 1) * indent) // indentation for each key in the current object (one unit deeper than padBeforeParenthesis)
  const lines = entries.map(([key, value]) => {
    const serializedValue = serializeTable(value, indent, level + 1)
    return `${padBeforeEachKey}\`${key}\`: ${serializedValue}`
  })

  return `{\n${lines.join(',\n')}\n${padBeforeParenthesis}}`
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
  const commonTable = {}

  for (const entry of allEntries.hasArea) {
    if (!commonTable[entry.area]) {
      commonTable[entry.area] = {}
    }
    
    for (const raw of entry.strings) {
      const text = raw.slice(1, -1) // remove backticks
      commonTable[entry.area][text] = text
    }
  }

  for (const entry of allEntries.noArea) {
    for (const raw of entry.strings) {
      const text = raw.slice(1, -1)
      commonTable[text] = text
    }
  }

  /* ==================================================
   * 2. generate translation table files (eg. en.js, fr.js, ko.js, etc.)
   * ================================================== */
  for (const langCode of supportedLangCodes) {
    const langJsPath = path.resolve(`src/i18n/tables/${langCode}.js`)
    let existingTable = {}

    try {
      const imported = await import(`file://${langJsPath}`)
      existingTable = imported.default || {}
    }  catch {
      // file does not exist yet — start fresh
    }

    // Merge common table with existing table (preserve existing entries, add missing or new entries)
    const finalTable = structuredClone(existingTable)

    for (const [key, value] of Object.entries(commonTable)) {
      if (typeof value === 'object') {
        // For the case of area object: { [area]: { [text]: text } }
        const area = key
        if (!finalTable[area]) {
          finalTable[area] = {}
        }

        for (const [nestedKey, text] of Object.entries(value)) {
          if (!(nestedKey in finalTable[area])) {
            finalTable[area][nestedKey] = text
          }
        }
      } else {
        // { [text]: text } part here.
        if (!(key in finalTable)) {
          finalTable[key] = value
        }
      }
    }

    // Write the final table to the file
    const fileContent = `const table = ${serializeTable(finalTable)}\n\nexport default table`
    await fs.writeFile(langJsPath, fileContent, 'utf8')
    console.log(`✅ Successfully prepared translations for ${langCode}.js`)
  }
}

run()
