const fs = require('fs')
const fse = require('fs-extra')

const { docDestination } = require('./config.json')
const { extractFilefolder } = require('./helper')

const variableDoc = `${docDestination}/modules.md`

// Write Documentation (Currently only writing out variables into a doc file)
const writeDocumentation = (filename, cssProperties) => {
  if (!fs.existsSync(variableDoc)) {
    fse.createFileSync(variableDoc)
    writeFileHeader()
  }
  writeThemeHeader(extractFilefolder(filename))

  Object.keys(cssProperties).forEach(key => {
    writeThemeVariable(key, cssProperties[key])
  })

  writeSpacer()
}

// Misc Helper functions
const appendFile = text => fs.appendFile(variableDoc, text, null, () => true)
const writeFileHeader = () => appendFile('# Variable Reference <CHANGE_ME:THEME_NAME>\n\n')
const writeThemeHeader = themeFilename => appendFile(`### ${themeFilename}\n\n`)
const writeThemeVariable = (variableName, variableDefaultValue) =>
  appendFile(
    `\`${variableName}\` - Default Value: \`${variableDefaultValue}\`\n`
  )
const writeSpacer = () => appendFile('\n\n\n')

module.exports = { writeDocumentation }
