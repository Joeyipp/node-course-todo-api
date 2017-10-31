// Set environment variables
// Export (Linux, OSX) || SET (windows) && (Chain commands)
// "test": "export NODE_ENV=test || SET NODE_ENV=test && mocha server/**/*.test.js",
// Local environment does not have process.env.NODE_ENV (Only on Heroku)
// MONGODB_URI: (PROTOCOL) mongodb:// (USERNAME:PASSWORD) @ (ADDRESS:PORT) / (DBNAME)
var env = process.env.NODE_ENV || 'development';

// System to manage local environment
if (env === 'development' || env === 'test') {
  // Require automatically parse JSON to JS Object, so we don't need to parse it ourselves
  var config = require('./config.json');
  var envConfig = config[env]; // When you need to use a variable to access a property, you have to use brackets notation

  // Object.keys: takes an object and all its keys and returns them as an array
  // ['PORT', 'MONGODB_URI']
  Object.keys(envConfig).forEach((key) => {
    process.env[key] = envConfig[key];
  });
}

// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
// }
// else if (env === 'test') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
