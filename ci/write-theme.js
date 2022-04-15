const fs = require('fs')
const fse = require('fs-extra')

const { themeDestination } = require('./config.json')
const { extractFilefolder } = require('./helper')

// Writes out result of PostCSS Transformations
const writePostcssCompiledFileToDestination = (compiledCss, filename) => {
  const outputFileLocation = `${themeDestination}/${extractFilefolder(
    filename
  )}`

  fse
    .createFile(outputFileLocation)
    .then(() => fs.writeFile(outputFileLocation, compiledCss, () => true))
}

module.exports = { writePostcssCompiledFileToDestination }
