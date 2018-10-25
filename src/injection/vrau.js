//
const axios = require('axios')
const { encaseP2 } = require('fluture')
const { compose, map, prop, tap } = require('ramda')
const { mapRej } = require('@mugos/ftw')

//
const get = encaseP2(axios.get)
const url = 'https://vrau.com.br/vrau'
const token = 'xablau'
const result = prop('body')
const xablau = (x) => x
const error = (err) => ({ status: 'Xablau', err })
const input = () => ({ url, headers: { Authorization: token } })

const Vrau = () => compose(
  map(xablau),
  map(result),
  mapRej(error),
  ({ url, headers }) => get(url, headers),
  input
)

module.exports = { Vrau, result, error, input }
