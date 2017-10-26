var mongoose = require('mongoose');

// Configure moongoose to connect to our DB
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {mongoose};
