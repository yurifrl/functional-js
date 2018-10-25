const test = require('ava')
const { Engine } = require('../../src/engine')
const Future = require('fluture')

// @TODO: Allow Parallel
// @TODO: Allow Middlewares
// @TODO: Allow Memoization

const authenticate = {
  type: 'http',
  request: ({ email, password, urls: { authenticate } }) => ({
    method: 'POST',
    data: { email, password, timeout: 168 },
    config: { headers: {} },
    url: authenticate
  }),
  validInput: () => true,
  validOutput: () => true,
  handleResponse: (x) => ({ token: x.data.auth_token }),
  handleRejection: (x) => ({ hy: 'Something fucked', x })
}

test('...', async t => {
  const email = 'mail@mail.com'
  const password = '123'
  const urls = {
    authenticate: 'http://example.com.br'
  }

  const entrypoint = {
    email,
    password,
    urls
  }

  const engine = Engine({ http: { post: () => Future.of({ data: { auth_token: 'xablau' } })} })
  const response = await engine(
    authenticate
  )({ entrypoint }).promise()

  t.deepEqual(response, { email, password, urls, token: 'xablau' })
})

