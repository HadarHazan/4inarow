var express = require('express')
var bodyParser = require('body-parser')
var http = require('http');
var MongoClient = require('mongodb').MongoClient
var db = require('./server/db')


const allMessages =[] 
const sockets =[]
const port = process.env.PORT || 38700

const app = express();
//app.use(express.static(path.join(__dirname, 'bower_components')));
// const db = new Db('4inarow', new Server('localhost', 27017));

const server = http.createServer(app, function (socket){
  sockets.push(socket);
    socket.on('data', function(d) {
        for (var i = 0; i < sockets.length; i++){
            if (sockets[i] == socket) continue;
            sockets[i].write(d);
            console.log(d)
        }
    });
    
    socket.on('end', function(d) {
        var i = sockets.indexOf(socket);
        sockets.splice(i, 1);
    })
})

// Connect to Mongo on start
db.connect('mongodb://localhost:27017/4inarow', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
      console.log("We are connected");
      server.listen(port, function() {
        console.log('Express server running on *:' + port)
    })
  }
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

app.post('/api/addMessage', function (req, res){
    allMessages.push(req.body)
})

app.get('/api/getAllMessages', function (req, res){
  res.send(allMessages)
})

app.post('/api/winner', function(req, res){
    var collection = db.get().collection('score')
    var d = new Date()
    console.log("body is", req.body.player + " " + req.body.date)
    var doc = {
            Player: req.body.player,
            date: req.body.date
        }
    collection.insert(doc)
})

app.get('*',function (req, res) {
    res.redirect('score.html')
})
