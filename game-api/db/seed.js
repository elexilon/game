const request = require('superagent')
const user = require('./fixtures/user.json')
const games = require('./fixtures/games.json')

const createUrl = (path) => {
  return `${process.env.HOST || `http://localhost:${process.env.PORT || 3030}`}${path}`
}

request
  .post(createUrl('/users'))
  .send(user)
  .then((res) => {
    console.log('User created!')
    return authenticate(user.email, user.password)
  })
  .catch((err) => {
    console.error('Could not create user', err.message)
    console.log('Trying to continue...')
    authenticate(user.email, user.password)
  })

const authenticate = (email, password) => {
  request
    .post(createUrl('/sessions'))
    .send({ email, password })
    .then((res) => {
      console.log('Authenticated!')
      return createGames(res.body.token)
    })
    .catch((err) => {
      console.error('Failed to authenticate!', err.message)
    })
}
const createGames = (token) => {
  return games.map((game) => {
    return request
      .post(createUrl('/games'))
      .set('Authorization', `Bearer ${token}`)
      .send(game)
      .then((res) => {
        console.log('Game seeded...', res.body.title)
      })
      .catch((err) => {
        console.error('Error seeding game!', err)
      })
  })
}
