// Test suite: npm i expect mocha nodemon supertest --save-dev

// Steps to deploy on Heroku
// 1. Set const port = process.env.PORT || 3000
// 2. Change port on app.listen()
// 3. Add start script "start": "node server/server.js"
// 4. Tell Heroku which node engine/ version we are using
// "engines": {"node": "8.4.0"}
// 5. Setup Heroku Add-on: Configure Add-on, Find More Add-on, mLab MongoDB
// 6. heroku create
// 7. heroku addons:create mongolab:sandbox
// 8. heroku config (get config variables for installed add-ons)
// 9. Update mongoose.js DB Url (mongoose.connect())
// 10. heroku logs (show logs)

// Rename a heroku app
// git remote rm heroku
// git remote add heroku git@heroku.com:yourappname.git
// OR heroku create

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
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
