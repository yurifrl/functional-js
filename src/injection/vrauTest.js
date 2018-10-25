const test = require('ava')
const { Vrau, result, error, input } = require('./vrau')

const before = () => ''
const after = () => ''

test('Varau', async t => {
  const get = () => Promise.resolve({ body: 'WOW' })

  const vrau = Vrau({ get })
  const res = await vrau().promise()

  console.log(res)
})

test('Unit', t => {
  // ... test result
  // ... test error
  // ... test input
})

// test('Vcr test', async t => {
//   vcr.config!({ get: 'https://xablau', value: { body: 'WOW' } })

//   const vrau = Vrau()
//   const res = await vrau().promise()

//   // Test with vcr
// })
