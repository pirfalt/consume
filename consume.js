module.exports = consume;

// conusme( (Error) => void, (T) => void ) => Callback<T>
function consume(onError, onData) {
  return function(err, val) {
    if (err) onError(err)
    else onData(val)
  }
}
