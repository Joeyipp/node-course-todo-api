const {SHA256} = require('crypto-js');

var message = 'I am user number 3';
var hash = SHA256(message).toString();

// Hash is a one way algorithm, can't get original message back if I have the result
// Obsfucate the plain-text
// Storing passwords in db
console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
  id: 4
};

// Hash property is the hashed value of the data
// JSON.stringify convert object to string to be hashed
// Salting the hash means you add something to the hash that is unique that changes the value
var token = {
  data: data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString(); // Calling toString to store the resulting string hash
}

// Example of MITM
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed. Do not trust!');
}
