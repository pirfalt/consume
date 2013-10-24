var test = require('tape')
var fs = require('fs')
var consume = require('../consume')

var value = {value: 'A value'}
var error = new Error('Broken')
var valBack = function(cb) {
  cb(null, value)
}
var errBack = function(cb) {
  cb(error)
}

test('Consumes values from callbacks', function(assert) {
  var c = consume(
    function(err) {
      assert.equal(err, error)
    }
    ,function(val) {
      assert.equal(val, value)
    }
  )

  var cOnlyVal = consume(
    null
    ,function(val) {
      assert.equal(val, value)
    }
  )

  valBack(c)
  valBack(cOnlyVal)
  assert.throws( function(){ errBack(cOnlyVal) }, 'Consuming only the value throws on error' )

  assert.end()
})

test('Consumes errors from callbacks', function(assert) {
  var c = consume(
    function(err) {
      assert.equal(err, error)
    }
    ,function(val) {
      assert.equal(val, value)
    }
  )

  var cOnlyErr = consume(
    function(err) {
      assert.equal(err, error)
    }
  )

  errBack(c)
  errBack(cOnlyErr)
  assert.throws( function(){ valBack(cOnlyErr) }, 'Consuming only the error throws on value' )

  assert.end()
})

test('Read test', function(assert) {
  function guessFirstLine(buffer) {
    var firstLine = buffer.toString().split('\n')[0]
    var guess = 'var test = require(\'tape\')'

    assert.equal(firstLine, guess)
    assert.end()
  }

  function wrongGuess(error) { // Should never be called
    assert.fail(error.toString())
    assert.end()
  }

  fs.readFile('test/index.js', consume(wrongGuess, guessFirstLine))
})
