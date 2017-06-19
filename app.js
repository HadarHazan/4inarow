var express = require('express')
var app = express()
var bodyParser = require('body-parser')

//var http = require("http");

 //Retrieve
var MongoClient = require('mongodb').MongoClient
  
const initServerAfterDb = function(err, db) {
  if(!err) {
      
        console.log("We are connected")
        var collection = db.collection('mycollection')

        app.use(bodyParser.json());

        app.use('/static', express.static('public'))

        app.get('/', function (req, res) {
          res.send('Hello World!')
        })

        app.post('/winner', (req, res) => {
            var d = new Date()
           
            console.log("body is", req.body, d.toUTCString())
            var doc = {
                winnerPlayer: req.body,
                date: "hadar"
            }
            collection.insert(doc)
        })
        
        app.get('/board', (req, res) => {           
            
            var winnerList = collection.find()
            
            console.log("num of doc", collection.find())
            
             // Retry to get the collection, should work as it's now created
            db.collections(function(err, collections) {
              assert.equal(null, err)
              assert.ok(collections.length > 0)

              db.close()
            })
        })
                           

        app.listen(3000, function () {
            console.log('Example app listening on port 3000!')
        })

//        db.close();
//        console.log("We are disconnected")
  }
}

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/4inarow", initServerAfterDb)  

//app.use('/static', express.static('public'))
//
//app.get('/', function (req, res) {
//  res.send('Hello World!')
//})
//
//app.listen(3000, function () {
//    console.log('Example app listening on port 3000!')
//})
//var mongo = require('mongodb'),
// Server = mongo.Server,
// Db = mongo.Db;
//
//var server = new Server('localhost', 27017, {auto_reconnect: true});
//var db = new Db('4inarow', server);
//
//var onErr = function(err,callback){
// db.close();
// callback(err);
//};

//app.get('/board', (req, res) => {           
//    db.open(function(err, db) {
//  if(!err) {
//      console.log(db.defu
//      console.log("We are connected")
//      db.collection('mycollection', function(err, collection) {
//    if(!err){
//        console.log(collection.length)
//        console.log(collection[0])
//     collection.find().toArray(function(err, docs) {
//      if(!err){
//       console.log(docs.length)
//       console.log(docs["<0>"])
//       var intCount = docs.length;
//       if(intCount > 0){
//        var strJson = ""
//        for(var i=0; i<intCount;){
//         strJson += '{"player":"' + docs[i].winner + '"}'
//         i=i+1;
//         if(i<intCount){strJson+=','}
//        }
//        console.log(strJson)
//        callback("",JSON.parse(strJson))
//       }
//      }
//      else{onErr(err,callback)}
//     });//end collection.find
//    }
//    else{onErr(err,callback)}
//   });//end db.collection
//  }
//  else{onErr(err,callback)}
// });// end db.open
//})

'use strict';
var http = require('http');
var port = process.env.PORT || 1337;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
}).listen(port);
console.log('Server running at http://127.0.0.1 Jump :1337/');
