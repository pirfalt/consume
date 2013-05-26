module.exports = consume;

function consume(onReject, onResolve) {
	return function(err, val) {
		if (err) onReject(err)
		else onResolve(val)
	}
}
