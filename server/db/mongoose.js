var mongoose = require('mongoose');

// Configure moongoose to connect to our DB
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {mongoose};

// NODE_ENV, production, development, test
// process.env.NODE_ENV === 'production'
