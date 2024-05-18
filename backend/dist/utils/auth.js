"use strict";

var jwt = require('jsonwebtoken');
var tokenSecret = process.env.SECRET || 'secret';
function getTokenFromUser(user) {
  return jwt.sign({
    id: user.codcliente,
    nombre: user.nombrecliente
  }, tokenSecret, {
    expiresIn: 3600
  });
}
function getTokenFromAuthHeader(req) {
  var authorization = req.header('Authorization');
  if (authorization) {
    return authorization.split(' ')[1];
  }
  return undefined;
}

// Login Required middleware.

var isAuthenticated = function isAuthenticated(req, res, next) {
  var token = getTokenFromAuthHeader(req);
  if (!token) {
    res.status(401);
    res.json({
      errorMessage: "INVALID_AUTH_TOKEN",
      details: "Missing token"
    });
    return;
  }
  try {
    var userData = jwt.verify(token, tokenSecret);
    req.user = userData;
    return next();
  } catch (err) {
    res.status(401);
    res.json({
      errorMessage: "INVALID_AUTH_TOKEN",
      details: "" + err
    });
    return;
  }
};
module.exports = {
  getTokenFromUser: getTokenFromUser,
  isAuthenticated: isAuthenticated
  // otras funciones que se exportan, si las hay
};