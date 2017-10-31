const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
  // user with valid authentication token
  _id: userOneId,
  email: 'andrew@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  // user without token
  _id: userTwoId,
  email: 'jen@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString()
  }]
}];

// Seed todo data
const todos = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator: userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333,
  _creator: userTwoId
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

// InsertMany does not get through the UserSchema pre
// Use Save() to get through the middleware
const populateUsers = (done) => {
  User.remove({}).then(() => {
    // Save() returns a promise
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    // Promise.all takes an array of promises
    // This promise will NOT get fired UNLESS both promises (userOne & userTwo) were successfully resolve
    return Promise.all([userOne, userTwo]);
  }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
