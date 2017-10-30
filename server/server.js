// Test suite: npm i expect mocha nodemon supertest --save-dev
// GET, DELETE, UPDATE, CREATE
// MongoDB, Mongoose, API, Postman, Routes
// Token System: String that get sent back by our signup/ login request, passed as a header

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
// 10. git push heroku master
// 11. heroku logs (show logs)
// 12. heroku open

// Rename a heroku app
// git remote rm heroku
// git remote add heroku git@heroku.com:yourappname.git
// OR heroku create

// Body-parser allows us to send JSON to the server
// Parses the string (JSON) and turns it into JS object
require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

// Local Imports
var {moongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT;

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

// DELETE /todos/12345324
app.delete('/todos/:id', (req, res) => {
  // Get the Id
  var id = req.params.id;

  // Validate the id -> not valid? return 404
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // Remove todo by id
    // success
      // If no doc, send 404
      // If doc, send doc back with status 200
    // error
      // 400 with empty body
  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

// PATCH - Update a resource
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  // Pick takes an object and takes an array of properties you want to pull off
  // if they exist
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }
  else {
    body.completed = false;
    body.completedAt = null;
  }

  // new (mongoose) => returnOriginal (mongodb)
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })

});

// POST /users (Create new user account)
// _.pick
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  // Models method and instances method
  user.save().then((user) => {
    return user.generateAuthToken();
  }).then((token) => {
    // Send the token back as a HTTP response header
    // header() takes 2 arguments, key-value pairs
    // x-auth = custom header
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

// // Middleware function
// var authenticate = (req, res, next) => {
//   var token = req.header('x-auth');
//
//   User.findByToken(token).then((user) => {
//     if (!user) {
//       // Promise.reject will execute the catch (e) block
//       return Promise.reject();
//     }
//     // Modify the request object
//     // Able to use the modified request object in the routes below
//     req.user = user;
//     req.token = token;
//     next();
//   }).catch((e) => {
//     // 401 = Authentication required
//     res.status(401).send();
//   });
// };

// Require authentication + x-auth token
// Find the associate user + send the user back
// Reference the function to use the middleware
app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {app};
