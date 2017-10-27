// Todo.remove({})
// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove
Todo.findOneAndRemove({_id: '59f297ad1a99a92554a6ac06'}).then((todo) => {
  console.log(todo);
});


// Todo.findByIdAndRemove
Todo.findByIdAndRemove('59f297ad1a99a92554a6ac06').then((todo) => {
  console.log(todo);
});
