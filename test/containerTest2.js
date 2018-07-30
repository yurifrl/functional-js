const test = require('ava')
const  { trace } = require('@mugos/log')
const { map, compose, equals, ifElse } = require('ramda')
const { Maybe, Just, None, Left, Right } = require('monet')

class Container {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new Container(x);
  }

  map (f) {
    return Container.of(f(this.$value));
  }
}
test('works', async t => {
  compose(
    map(trace),
    Container.of
  )(1)
})
