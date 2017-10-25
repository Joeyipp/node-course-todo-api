// Body-parser allows us to send JSON to the server
// Parses the string (JSON) and turns it into JS object
var express = require('express');
var bodyParser = require('body-parser');

// Local Imports
var {moongoose} = require('./db/moongoose');
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

app.listen(3000, () => {
  console.log('Started on port 3000');
})
