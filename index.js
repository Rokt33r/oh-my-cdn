const _ = require('lodash')
const got = require('got')
const fs = require('fs')
const path = require('path')

var config
try {
  config = JSON.parse(fs.readFileSync(path.resolve('oh-my-cdn.json')))
} catch (err) {
  console.error(err)
  process.exit(1)
}
console.log('Oh My CDN is fetching your targets now...')

var directory = config.directory == null ? 'vendor' : config.directory
if (config.targets == null) {
  console.log('No targets to fetch.')
  process.exit(0)
}
var targets = config.targets
try {
  fs.mkdirSync(path.resolve(directory))
} catch (err) {
  if (err.code !== 'EEXIST') {
    throw err
  }
}

var promises = []
_.forIn(targets, function fetchScripts (value, key) {
  var promise = new Promise((resolve, reject) => {
    var url, filename
    if (_.isString(value)) {
      url = value
      filename = key + path.extname(value)
    } else {
      url = value.url
      filename = value.filename
    }

    var writeStream = fs.createWriteStream(path.resolve(directory, filename))
    var fetchStream = got.stream(url)
      .on('error', () => {
        // Resolve it anyway
        console.log('Failed to fetch >> ' + filename)
        resolve(null)
      })
    fetchStream.pipe(writeStream)
      .on('finish', () => {
        console.log('Fetched >> ' + filename)
        resolve(null)
      })
      .on('error', (err) => {
        console.log('Failed to write >> ' + filename)
        reject(err)
      })
  })
  promises.push(promise)
})

Promise.all(promises)
  .then(() => {
    console.log('DONE')
    process.exit(0)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
