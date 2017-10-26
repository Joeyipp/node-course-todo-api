// db.collection('Todos').find().toArray()

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // Calling Find is only the first step
  // Find returns a MongoDB cursor/ pointer to those documents
  // Cursor has tons of methods, one of it is .toArray
  // .toArray returns a promise
  // Setup key-value pairs in find() as query parameter
  // .find({completed: false}

  // db.collection('Todos').find({
  //   _id: new ObjectID('59ed49247c24123faec0d233')     // Use ObjectID to query by ID
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err);
  // });

  db.collection('Users').find({name: 'Andrew'}).toArray().then((docs) => {
    console.log('Users');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch user', err)
  });

  // db.close();
});
