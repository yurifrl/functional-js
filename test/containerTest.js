const test = require('ava')
const  { trace } = require('@mugos/log')
const { map, compose, equals, ifElse } = require('ramda')
const { Maybe, Just, None, Left, Right } = require('monet')

class SafeNumber {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new SafeNumber(x);
  }

  map (f) {
    return SafeNumber.of(f(this.$value));
  }
}

class Zero {
  constructor(x) {
    this.$value = x;
  }

  static of(x) {
    return new Zero(x);
  }

  map (f) {
    return this
  }
}

class Number {
  constructor(x) {
    this.__value = x;
  }

  static of(x) {
    return ifElse(equals(0), Zero.of, SafeNumber.of)(x)
  }
}

const createNumber = test('works', async t => {
  const div = x => x / 2
  Number.of(0).map(div).map(x => x + 1).map(x => x * 2).map(trace)
})
