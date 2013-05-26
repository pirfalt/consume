# Consume

Consume a callback without complecting handling with errorhandling.

Because functions that only do one thing is better than functions that does two. And honestly how many times did you forget to write `if (err) /* Handle it */` at the top of a callback.

## Example

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
      log(error); // Not that handled, but you get the point
    }

## Docs

### consume(errorHandler, successHandler)

    consume( (Error) => void, (Value) => void ) =>
      (err, data) => void

Thats all. Technically both the errorHandler and the successHandler are optional, but you don't get anywhere without a success handler. And you have to type `consume(null, onSuccess)` to ignore the error, which should make you think twice.

## Continuable is awsome

As a companion to [`continuable`][continuable], `consume` lets you take that last step and use single purpose composable functions to the end. To be fair the [`continuable`][continuable] part does most of the cool stuff here. (Like error propagation and )

    // Get a callback, make it a monad
    continuable( readFile('../package.json') )

    // Transform the response
    .map( compose( asJSON, String ) )

    // Make new request using data in response
    .chain(function(json) {
      return readFile( json.license.url )
    })

    // Consume in the end
    ( consume( handleError, compose( log, String ) ) )



    // Helpers that gets hoisted
    function readFile(uri) {
      return function(cb) {
        fs.readFile(uri, cb)
      }
    }
    
    function asJSON(str) {
      return JSON.parse(str)
    }
    
    function log(v){
      console.log.apply(console, arguments)
      return v
    }


[continuable]: https://npmjs.org/package/continuable