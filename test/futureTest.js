const test = require('ava')
const { compose, map, pick, prop, path, objOf } = require('ramda')
const { Right } = require('monet')
const { Future } = require('../lib/ftw')
const { trace, log } = require('../lib/log')

const app = ({ findUserItems, findItems }) => compose(
  map(map(trace)),
  map(compose(map(prop('data')), findItems)),
  map(compose(objOf('ids'), map(prop('id')), prop('data'))),
  findUserItems,
  pick([ 'userId' ])
)
test('works', async t => {
  // Stubs
  const findUserItems = ({ userId }) => Future.resolve(({ data: [ { id: 1 } ] }))
  const findItems = ({ ids }) => Future.resolve({ data: [ { id: 1, name: 'potato' } ] })

  const resp = await app({ findUserItems, findItems })({ userId: 1 })

  log('END --->', resp)

  t.deepEqual(resp.isRight(), true)
  t.deepEqual(resp.value, [{ id: 1, name: 'potato' }])
})
