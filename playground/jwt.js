// JSON Web Token (JWT)
// JWT provides 2 core functions (1) Create token (2) Verify token

const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

// Sign takes the data object and sign it (create hash and return token value)
// Verify takes the token and secret and make sure they are not changed
// Token is sent back to the user when they signup/ login
// JWT.io: (1) Header, (2) Payload, iat = issue at timestamp (3) Hash
var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);
