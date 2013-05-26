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

  valBack(c)

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

  errBack(c)

  assert.end()
})

test('Read test', function(assert) {
  function guessFirstLine(buffer) {
    var firstLine = buffer.toString().split('\n')[0]
    var guess = 'var test = require(\'tape\')'

    assert.equal(firstLine, guess)
    assert.end()
  }

  function wrongGuess(error) {
    assert.fail(error.toString())
    assert.end()
  }

  fs.readFile('./index.js', consume(wrongGuess, guessFirstLine))
})