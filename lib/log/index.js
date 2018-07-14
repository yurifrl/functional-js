const { curry, tap } = require('ramda')

// log :: prefix -> a -> IO(a) ->  a
const log = curry((prefix, val) => tap(x => console.log(prefix, x))(val))
// logP :: promise -> Promise
const logP = tap(x => x.then(log('Then -->')).catch(log('Catch -->')))
// logCond :: a -> IO(val) -> a
const logCond = curry((fakeX, actualX) => tap(
  (_) => log('condDebug --->', actualX), fakeX)
)
// trace :: a -> IO(a) -> a
const trace = tap(log('Tracer ----->'))

module.exports = {
  trace,
  log,
  logP,
  logCond
}
