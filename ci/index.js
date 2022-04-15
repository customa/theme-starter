// Imports
const fs = require('fs')
const glob = require('glob')
const processWithPostCSS = require('./processing-postcss.js')

const { themeSource } = require('./config.json')

// Fetch all files
glob(`${themeSource}/**/*.css`, {}, (err, files) => {
  files.forEach(filename =>
    fs.readFile(filename, (err, css) => {
      if (!err) processWithPostCSS(filename, css)
      else throw err
    })
  )
})
