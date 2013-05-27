# Consume

Consume a callback without complecting handling with errorhandling.

Because functions that only do one thing is better than functions that does two. And honestly how many times did you forget to write `if (err) /* Handle it */` at the top of a callback.

## Example

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
      console.log(error); // Not that handled, but you get the point
    }

## Docs

    type Callback<T>: (Error, T) => void

### consume(errorHandler, successHandler)

    consume( (Error) => void, (T) => void ) => Callback<T>

Thats all. Technically both the errorHandler and the successHandler are optional, but you don't get anywhere without a success handler. And you have to type `consume(null, onSuccess)` to ignore the error, which should make you think twice.


## Continuable

As a companion to [`continuable`][continuable], `consume` lets you take that last step and use single purpose, composable functions to the end.

## License MIT



[continuable]: https://npmjs.org/package/continuable