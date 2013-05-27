var consume = require('../consume')
var fs = require('fs')


// Example 1: Log some data from package.json
// (Function hoisting lets you read the important stuff first)

fs.readFile('../package.json', consume(handleError, logPackage))


function logPackage(buffer) {
  var json = JSON.parse(buffer.toString())
  console.log(
    json.name, '\n',
    json.description, '\n',
    json.version, '\n',
    json.license.type,'\n'
    )
}

function handleError(error) {
  /* Log the error, could work for many errors */
  console.log(error);
}
