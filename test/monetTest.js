const test = require('ava')
const { Left, Right, NonEmptyList, List } = require('monet')
const { curry, always, ifElse, compose } = require('ramda')
const { trace, log } = require('../lib/log')

const person = curry((forename, surname, address) =>
  forename + " " + surname + " lives in " + address
)

const ifEmpty = curry((onTrue, onFalse, ctx) =>
  ifElse(x => x.isNil, onTrue, onFalse)(ctx)
)
test('...', async t => {
  const maybeAddress = Right('Dulwich, London')
  const maybeSurname = Right('Baker')
  const maybeForename = Right('Tom')

  const result = maybeAddress
    .ap(maybeSurname
      .ap(maybeForename.map(person)))
  console.log(result)
})

test('Lists', t => {
  const list2 = List.fromArray([1, 2, 3])
  const list = List.fromArray([])

  ifEmpty(log('empty'), log('nonEmpty'), list)
})
