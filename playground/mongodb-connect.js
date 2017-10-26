// db.collection('Users').insertOne()

// ObjectID is a 12 byte value (1st 4 bytes is timestamp, next 3 bytes are machine-identifier, next 2 bytes are process id, next 3 byte-counter)
// ObjectID is the default way MongoDB creates id, but you can provide your own _id: 123 (Efficient scaling, do not need to increment from existing ID)

// Mongo Client allows us to connect to a Mongo server
// const MongoClient = require('mongodb').MongoClient;

// Use destructuring {} to pull of any code from the mongodb library
// Creates a variable called MongoClient setting it and equal to the MongoClient property of require('mongodb')
const {MongoClient, ObjectID} = require('mongodb'); // Identical to line 5

// Create a new instance of ObjectID
// var obj = new ObjectID();
// console.log(obj);

// ES6 Feature: Object Destructuring - make new variable from an object property
// Object Destructuring lets you pull out properties from an object-creating variable
// var user = {name: 'andrew', age: 25};
// // Make a variable and destructure the user object, pulling off the name property, creating a new name variable and set it to whatever the value it is
// var {name} = user;
// // Print out the value of the name property/ variable
// console.log(name);

// In MongoDB, you do not need to create a database first to be able to start using it
// Db is automatically created upon kickstarting
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  // Return will stop all executions after it, so the 2nd console.log message will not be printed
  // Or use If-else()
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // InsertOne lets you insert a new document into our collection
  // Takes 2 arguments: Object and Callback function
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert new doc into Users (name, age, location)
  db.collection('users').insertOne({
    name: "Andrew",
    age: 25,
    location: "Ohio"
  }, (err, result) => {
    if (err) {
      return console.log('Unable to insert user', err);
    }
    // console.log(JSON.stringify(result.ops, undefined, 2));
    // Result.ops is an array of all the documents that got inserted
    // getTimestamp() method return the timestamp creation in GMT
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  });


  db.close();
});
