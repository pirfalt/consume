module.exports = consume;

// conusme( (Error) => Any, (T) => Any ) => (Error, T) => Any
function consume(onError, onData) {
  return function(err, val) {
    return err
      ? onError(err)
      : onData(val)
  }
}
