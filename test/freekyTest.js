const test = require('ava')
const  { trace, log } = require('@mugos/log')

const { Coyoneda } = require('../src/coyoneda')

test('Coyoneda', t => {
  // const set = new Set([1, 1, 2, 3, 3, 4])
  const cResult = Coyoneda.lift([1,2,3])
    .map(x => x + 1)
    .map(x => `${x}!`)
    .lower()

  log('Coyoneda ->', cResult)
})

// Container
const tunacan = Container('tuna')
const res = Coyoneda.lift(tunacan)
  .map(x => x.toUpperCase())
  .map(x => x + '!')


test('container', t => {
  const fn = res.f
  const can = res.x

  trace(fn(can.x))
})

// Free
const Free = daggy.taggedSum('Free', {
  Impure: ['x', 'f'],
  Pure: ['x'],
})
const { Impure, Pure } = Free

const kliesliComp = (f, g) => x => f(x).chain(g)
Free.prototype.chain = function(f) {
  return this.cata({
    Impure: (x, g) => Impure(x, kliesliComp(g, f)),
    Pure: x => f(x)
  })
}
Free.prototype.map = function(f) {
  return this.cata({
    Impure: (x, g) => Free.Impure(x, y => g(y).map(f)),
    Pure: x => Free.Pure(f(x))
  })
}
Free.of = Pure
const liftF = command => Impure(command, Pure)

test('free', t => {
  trace(Free.toString())
})

// Maybe
const Maybe = daggy.taggedSum('Maybe', {
  Just: ['x'],
  Nothing: []
})

const { Just, Nothing } = Maybe
const just = compose(liftF, Just)
const nothing = liftF(Nothing)
const runMaybe = free => free.cata({
  Pure: x => x,
  Impure: (m, q) => m.cata({
    Just: x => runMaybe(q(x)),
    Nothing: () => Nothing
  })
})
// Maybe interpreter
const safeProp = (k, o) => o[k] ? just(o[k]) : nothing
const maybeName = safeProp('user', { user: { name: 'jerry' } })
  .chain(u => safeProp('name', u))
  .map(n => n.toUpperCase())

test('maybe', t => {
  log('maybeName--->', runMaybe(maybeName))
  log('Just -->', Just(1))
  log('Nothing -->', Nothing)
})
