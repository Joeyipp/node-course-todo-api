// Set environment variables
// Export (Linux, OSX) || SET (windows) && (Chain commands)
// "test": "export NODE_ENV=test || SET NODE_ENV=test && mocha server/**/*.test.js",
// Local environment does not have process.env.NODE_ENV (Only on Heroku)
var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
}
else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
