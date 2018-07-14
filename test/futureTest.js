const test = require('ava')
const { compose, map, pick, prop, path, objOf } = require('ramda')
const { Right } = require('monet')
const { Future } = require('@mugos/ftw')
const { trace, log } = require('@mugos/log')
const { task } = require('folktale/concurrency/task')

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
