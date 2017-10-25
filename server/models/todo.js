var mongoose = require('mongoose');

// Mongoose document model to specify the attributes - Todo
// Validators, types, and defaults
var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true, // validator
    minlength: 1,
    trim: true // trim off any leading and trailing whitespaces
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {Todo};

// // Create a new instance of Todo (Constructor)
// var newTodo = new Todo({
//   text: 'Cook dinner'
// });
//
// // .save() save the new instance to the MongoDB database
// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo');
// });

// // 2nd todo item
// var otherTodo = new Todo({
//   text: 'Feed the cat',
//   completed: true,
//   completedAt: 123
// });
//
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save', e);
// });
