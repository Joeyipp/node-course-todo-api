var mongoose = require('mongoose');

// New User model - email - required, trim, type string, min length of 1
var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  }
});

module.exports = {User};

// var user = new User({
//   email: 'andrew@example.com'
// });
//
// user.save().then((doc) => {
//   console.log('User saved', doc);
// }, (e) => {
//   console.log('Unable to save user', e);
// })
