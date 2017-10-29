const bcrypt = require('bcryptjs');

var password = '123abc!';

// GenSalt - generate salt to salt our password
// Hash - hash password
// 10 is the no. of rounds
bcrypt.genSalt(10, (err, salt) => {
  // 3 arguments, (1) The thing to hash, (2) Salt to use, (3) Callback function
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var hashedPassword = '$2a$10$7szS6otTWVd46avrbk64Xu6AGR8BsrLqHphO.TE/WCPrirvTe7w1a';

// Takes the plain value and hashed value and let you know if they are equal to each other
// Return a res - True or False
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
