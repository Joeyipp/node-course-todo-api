// Test suite: npm i expect mocha nodemon supertest --save-dev

// Body-parser allows us to send JSON to the server
// Parses the string (JSON) and turns it into JS object
var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

// Local Imports
var {moongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

// httpstatuses.com
// CRUD - Create, Read, Update, Delete
// Create a resource using POST HTTP method
// And send that resource as body
app.post('/todos', (req, res) => {
  //console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
     res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/12345324
app.get('/todos/:id', (req, res) => {
  // req.params is an object of key-value pairs
  // res.send(req.params);
  var id = req.params.id;

  // Valid id using isValid
    // 404 - send back empty send
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // findById
    // success
      // If todo - send it back
      // If no todo - send back 404 with empty body
    // error
      // 400 - send back empty body back
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});



app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
