const test = require('ava')
const { compose, map, pick, prop, path, objOf } = require('ramda')
const { trace, log } = require('../lib/log')
const { task } = require('folktale/concurrency/task')

test('works', t => {


  log('END --->', task)

  t.deepEqual(1, 1)
})
