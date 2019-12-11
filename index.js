const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')
const app = express()
const db = require('./queries')

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://jde27:ShellSquad@cluster0-drgwd.mongodb.net/test?retryWrites=true&w=majority"

MongoClient.connect(uri, (err, client) => {
  if (err) return console.log(err)
  mongoDB = client.db('test') 
})

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

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

// https://code.tutsplus.com/tutorials/file-upload-with-multer-in-node--cms-32088
app.post('/photo', upload.single('photo'), (req, res) => {
	var img = fs.readFileSync(req.file.path);
  var encode_image = img.toString('base64');
  var finalImg = {
      contentType: req.file.mimetype,
      image:  new Buffer(encode_image, 'base64')
   };
  db.collection('mycollection').insertOne(finalImg, (err, result) => {
  	console.log(result)

    if (err) return console.log(err)

    console.log('Saved to database!')
    res.redirect('/')
  
    
  })
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})