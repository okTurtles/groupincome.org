import fs from 'node:fs/promises'
import path from 'node:path'

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
    /\bL\s*\(\s*(['"`])([\s\S]*?)\1\s*(?:,|\))/g;

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
  const pad = ' '.repeat(level * indent)
  const nextPad = ' '.repeat((level + 1) * indent)

  if (typeof obj === 'string') {
    return `\`${obj}\``
  }

  if (typeof obj !== 'object' || obj === null) {
    return String(obj)
  }

  const entries = Object.entries(obj)

  if (entries.length === 0) {
    return '{}'
  }

  const lines = entries.map(([key, value]) => {
    const serializedValue = serializeTable(value, indent, level + 1)
    return `${nextPad}\`${key}\`: ${serializedValue}`
  })

  return `{\n${lines.join(',\n')}\n${pad}}`
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
   * 1. Build generated table
   * ================================================== */
  const generatedTable = {}

  for (const entry of allEntries.hasArea) {
    if (!generatedTable[entry.area]) {
      generatedTable[entry.area] = {}
    }
    
    for (const raw of entry.strings) {
      const text = raw.slice(1, -1) // remove backticks
      generatedTable[entry.area][text] = text
    }
  }

  for (const entry of allEntries.noArea) {
    for (const raw of entry.strings) {
      const text = raw.slice(1, -1)
      generatedTable[text] = text
    }
  }

  /* ==================================================
   * 2. Load existing en.js if it exists
   * ================================================== */
  const enJsPath = path.resolve('src/i18n/tables/en.js')
  let existingTable = {}

  try {
    const imported = await import(`file://${enJsPath}`)
    existingTable = imported.default || {}
  }  catch {
    // file does not exist yet — start fresh
  }

  /* ==================================================
   * 3. Merge (preserve existing, add missing)
   * ================================================== */
  const finalTable = structuredClone(existingTable)

  for (const [key, value] of Object.entries(generatedTable)) {
    if (typeof value === 'object') {
      // In this case, key = area, value = { [text]: text }
      const area = key
      if (!finalTable[area]) {
        finalTable[area] = {}
      }

      //  { [text]: text } part here
      for (const [nestedKey, text] of Object.entries(value)) {
        if (!(nestedKey in finalTable[area])) {
          finalTable[area][nestedKey] = text
        }
      }
    } else {
      // 'no-area' entries here
      if (!(key in finalTable)) {
        finalTable[key] = value
      }
    }
  }

  /* ==================================================
   * 4. Write en.js with backtick keys
   * ================================================== */
  const fileContent = `const table = ${serializeTable(finalTable)}\n\nexport default table`
  await fs.writeFile(enJsPath, fileContent, 'utf8')

  console.log(`✅ Successfully prepared translations for en.js`)
}

run()
