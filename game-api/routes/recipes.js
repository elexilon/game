const router = require('express').Router()
const { Game } = require('../models')

router.get('/games', (req, res, next) => {
  Game.find()
    // Newest games first
    .sort({ createdAt: -1 })
    // Send the data in JSON format
    .then((games) => res.json(games))
    // Throw a 500 error if something goes wrong
    .catch((error) => next(error))
  })
  .get('/games/:id', (req, res, next) => {
    const id = req.params.id
    Game.findById(id)
      .then((game) => {
        if (!game) { return next() }
        res.status = 200
        res.json(game)
      })
      .catch((error) => next(error))
  })
  .post('/games', (req, res, next) => {
    let newGame = req.body

    Game.create(newGame)
      .then((game) => {
        res.status = 201
        res.json(game)
      })
      .catch((error) => next(error))
  })
  .put('/games/:id', (req, res, next) => {
    const gameId = req.params.id
    let updaGame = req.body

    Game.findOneAndUpdate(gameId, updaGame)
    .then((game) => {
      if (!game) { return next() }
      res.status = 200
      res.json(game)
    })
    .catch((error) => next(error))
  })
  .patch('/games/:id', (req, res, next) => {
    const gameId = req.params.id
    let updaGame = req.body

    Game.findOneAndUpdate(gameId, updaGame)
    .then((game) => {
      if (!game) { return next() }
      res.status = 200
      res.json(game)
    })
    .catch((error) => next(error))

  })
  .delete('/games/:id', (req, res, next) => {
    const id = req.params.id
    console.log(id)
    Game.findByIdAndRemove(id)
    .then((game) => {
      if (!game) { return next() }
      res.status = 204
    })
    .catch((error) => next(error))
  })


module.exports = router
