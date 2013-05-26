var consume = require('../consume')
var continuable = require('continuable')
var f = require('funcy')
var fs = require('fs')
var log = function(v) {
	console.log.apply(console, arguments)
	return v
}


// Example 1: Log some data from package.json
// (Function hoisting lets you read the important stuff first)

fs.readFile('../package.json', consume(handleError, logPackage))


function logPackage(buffer) {
  var json = JSON.parse(buffer.toString())
  log(
    json.name, '\n',
    json.description, '\n',
    json.version, '\n',
    json.license.type,'\n'
    )
}

function handleError(error) {
  /* Log the error, could work for many errors */
  log(error);
}





// Example 2: Log the license, found by looking in package.json

// Get a callback, make it a monad
continuable( readFile('../package.json') )

// Transforme responce
.map( f.compose( asJSON, String ) )

// Make new request using data in response
.chain(function(json) {
	return readFile( json.license.url )
})

// Consume in the end
( consume( handleError, f.compose( log, String ) ) )



function readFile(uri) {
	return function(cb) {
		fs.readFile(uri, cb)
	}
}
function asJSON(str) {
	return JSON.parse(str)
}



// Example 2: Without continuable or consume
// Get a callback
fs.readFile('../package.json', function(err, val) {

	// Handle error
	if (err) return handleError(err)

	// Transform response
	var json = JSON.parse( String(val) )

	// Make new request using data in response
	fs.readFile(json.license.url, function(err, buffer) {

		// Handle error
		if (err) return handleError(err)

		// Handle success
		log(buffer.toString())
	})
})

