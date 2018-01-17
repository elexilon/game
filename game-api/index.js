const express = require('express')
const bodyParser = require('body-parser')
const { games, users, sessions } = require('./routes')
const passport = require('./config/auth')
const http = require('http')
const socketAuth = require('./config/socket-auth')
const socketIO = require('socket.io')

var cors = require('cors')

const port = process.env.PORT || 3030
let app = express()

var corsOptions = {
  origin: 'http://localhost:3000',
  authenticate: true
}

app
  .use(cors(corsOptions))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())
  .use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
    next()
  })
  // .get('/', (req, res) => {
  //   //res.send('Hello from Express!')
  // })
  // Our games routes
  .use(games)

  .use(users)

  .use(sessions)

  // catch 404 and forward to error handler
  .use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // final error handler
  .use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: app.get('env') === 'development' ? err : {}
    })
  })

  .listen(port, () => {
    console.log(`Server is listening on port ${port}`)
  })
  const server = http.Server(app)
  const io = socketIO(server)
  
  io.use(socketAuth);

  io.on('connect', socket => {
    socket.emit('ping', `Welcome to the server, ${socket.request.user.name}`)
    console.log(`${socket.request.user.name} connected to the server`)
  })
