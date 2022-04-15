// Imports
const cssnano = require('cssnano')
const customProperties = require('postcss-custom-properties')
const postcss = require('postcss')
const reporter = require('postcss-reporter')

const { writePostcssCompiledFileToDestination } = require('./write-theme')
const { writeDocumentation } = require('./write-documentation')

// Pipe file through PostCSS and export variables
module.exports = (filename, css) => {
  const cachedObject = { customProperties: {} }
  const postcssOptions = [
    customProperties({
      exportTo: cachedObject,
    }),
    cssnano(),
    reporter(),
  ]

  postcss(postcssOptions)
    .process(css, { from: undefined })
    .then(result => handlePostcssResult(result, filename, cachedObject))
}

// Handle PostCSS result
const handlePostcssResult = (result, filename, cachedObject) => {
  writePostcssCompiledFileToDestination(result.css, filename)
  writeDocumentation(filename, cachedObject.customProperties)
}
