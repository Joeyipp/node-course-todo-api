const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// Schema defines the attributes of a model
var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true, // Verify the email is unique, not currently in collection
    validate: {
      // validator: (value) => {
      //   return validator.isEmail(value);
      // },
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// Override the toJSON() method
// Determine what gets sent back when a mongoose model is converted into a JSON value
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  // Return only the _id and email from userObject
  return _.pick(userObject, ['_id', 'email']);
}

// Methods is an object
// Arrow function does not bind the *this keyword
// *this stores the individual document
UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};

// New User model - email - required, trim, type string, min length of 1
// {
//   email: 'andrew@example.com',
//   password: 'skdalshdajkshdkjahdas',
//   tokens: [{
//     access: 'auth',
//     token: 'asjdakjsjdlkasdjlkasdasda'
//   }]
// }

// Mongoose Custom Validators + NPM Validator (npm install validator)
// var User = mongoose.model('User', {
//   email: {
//     type: String,
//     required: true,
//     trim: true,
//     minlength: 1,
//     unique: true, // Verify the email is unique, not currently in collection
//     validate: {
//       // validator: (value) => {
//       //   return validator.isEmail(value);
//       // },
//       validator: validator.isEmail,
//       message: '{VALUE} is not a valid email'
//     }
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 6
//   },
//   tokens: [{
//     access: {
//       type: String,
//       required: true
//     },
//     token: {
//       type: String,
//       required: true
//     }
//   }]
// });

// var user = new User({
//   email: 'andrew@example.com'
// });
//
// user.save().then((doc) => {
//   console.log('User saved', doc);
// }, (e) => {
//   console.log('Unable to save user', e);
// })
