const jwt = require('jsonwebtoken');


const tokenSecret = process.env.SECRET || 'secret';

function getTokenFromUser(user) {
  return jwt.sign({ id: user.codcliente, nombre: user.nombrecliente }, tokenSecret)
}

function getTokenFromAuthHeader(req) {
  const authorization = req.header('Authorization')

  if (authorization) {
    return authorization.split(' ')[1];
  }

  return undefined
}


// Login Required middleware.
 
const isAuthenticated = (req, res, next) => {
  const token = getTokenFromAuthHeader(req);

  if (!token) {
    res.status(401);
    res.json({
      errorMessage: "INVALID_AUTH_TOKEN",
      details: "Missing token",
    });

    return;
  }

  try {
    const userData = jwt.verify(token, tokenSecret);

    req.user = userData;

    return next();

  } catch (err) {
    res.status(401);
    res.json({
      errorMessage: "INVALID_AUTH_TOKEN",
      details: "" + err,
    });

    return;
  }
};

module.exports = {
    getTokenFromUser,
    isAuthenticated
    // otras funciones que se exportan, si las hay
  }