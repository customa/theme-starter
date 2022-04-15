const handleFilename = (filename, neededLevel) =>
  filename
    .split('/')
    .slice(neededLevel * -1)
    .join('/')

const extractFilefolder = filename => handleFilename(filename, 2)

module.exports = {
  handleFilename,
  extractFilefolder,
}
