// Deploy with: git subtree push --prefix backend heroku master
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
require('dotenv').config()
const SECRET = process.env.BACKEND_SECRET

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

// For every response..
app.all('*', function (req, res, next) {
  let token = getBearerToken(req)
  if (token == SECRET) {
    next() // Go onto the queries.
    app.get('/turtle', db.getTurtles)
    app.get('/turtle/:id', db.getTurtleById)
    app.post('/turtle', db.createTurtle)
    app.put('/turtle/:id', db.updateTurtle)
    app.delete('/turtle/:id', db.deleteTurtle)
    app.get('/sighting', db.getSightings)
    app.get('/sighting/:id', db.getSightingById)
    app.post('/sighting', db.createSighting)
    app.put('/sighting/:id', db.updateSighting)
    app.delete('/sighting/:id', db.deleteSighting)
    app.get('/sighting/turtle/:turtleId', db.getSightingByTurtleId)
    app.get('/photo', db.getPhotos)
    app.get('/photo/:id', db.getPhotoById)
    app.post('/photo', db.createPhoto)
    app.put('/photo/:id', db.updatePhoto)
    app.delete('/photo/:id', db.deletePhoto)
    app.get('/photo/turtle/:turtleId', db.getPhotoByTurtleId)
    app.get('/photo/sighting/:sightingId', db.getPhotoBySightingId)
  } else {
    res.status(401).json("Unauthorized Request")
  }
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

const getBearerToken = (request) => {
  return request.headers.authorization.split(" ")[1]
}