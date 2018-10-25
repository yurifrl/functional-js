const {
  compose, cond, map, always, T, reverse, reduce, mapAccumRight, propEq,
  chain, mapAccum, merge, concat, append, ifElse, prop, tap
} = require('ramda')
const { mms, mapRej } = require('@mugos/ftw')
const { trace, log } = require('@mugos/log')
const { encaseP2, encaseP3, reject, of } = require('fluture')
const axios = require('axios')

// Pure
const method = ({ http: { post } }) => cond([
  [ propEq('method', 'POST'),   post ],
  [ T,                          always(reject('Undefined Type')) ]
])
const type = cond([
  [ propEq('type', 'http'), always(compose(prop('request'))) ]
])

const composition = (Deps) => (mon) => (ctx) => compose(
  map(merge(ctx)),
  mapRej(mon.handleRejection),
  map(mon.handleResponse),
  chain(ifElse(mon.validOutput, of, reject)),
  chain(method(Deps)),
  map(mon.request),
  ifElse(mon.validInput, of, reject),
)(ctx)

const Engine = (Deps) => (...args) => ({ entrypoint }) => compose(
  reduce((ctx, mon) => chain(composition(Deps)(mon), ctx), of(entrypoint)),
)(args)

// Impure
const Impure = {
  http: { post: ({ url, data, config }) => encaseP3(axios.post)(url, data, config) }
}

const engine = Engine(Impure)

module.exports = {
  Engine,
  engine
}
