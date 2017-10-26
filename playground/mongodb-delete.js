// db.collection('Users').deleteMany()
// db.collection('Users').deleteOne()
// db.collection('Users').findOneAndDelete()

const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // deleteMany
  // db.collection('Todos').deleteMany({text: "Eat lunch"}).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({text: "Eat lunch"}).then((result) => {
  //   console.log(result);
  // });

  // findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  // db.collection('Users').deleteMany({name: "Andrew"}); <- May leave out the .then()
  db.collection('Users').deleteMany({name: "Andrew"}).then((result) => {
    console.log(result);
  });

  db.collection('Users').findOneAndDelete({_id: new ObjectID('59ed3fee724d342c146aa058')}).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });

  // db.close();
});
