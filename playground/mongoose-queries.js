// Todo.find()
// Todo.findOne()
// Todo.findById()

const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '59f0ea11c772352b6cf1ed8511';
//
// // Check if ObjectID is valid?
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// // Mongoose doesn't require you to create a new ObjectID like mongoDB native
// // Find by ObjectID
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// // Return 1 document at most
// // Grab the first one that matches the query
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// // Find By Id
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

// Case 1 - Query works but invalid (User not found)
// Case 2 - User was found & print
// Case 3 - Handle errors
User.findById('59f1f4c4b219a11484f6086d').then((user) => {
  if (!user) {
     return console.log('Unable to find user');
  }
  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));
