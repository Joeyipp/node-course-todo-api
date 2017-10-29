var {User} = require('./../models/user');

// Middleware function
var authenticate = (req, res, next) => {
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      // Promise.reject will execute the catch (e) block
      return Promise.reject();
    }
    // Modify the request object
    // Able to use the modified request object in the routes below
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    // 401 = Authentication required
    res.status(401).send();
  });
};

module.exports = {authenticate};
