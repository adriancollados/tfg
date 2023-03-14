"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registro = exports.login = exports.getCliente = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _expressValidator = _interopRequireDefault(require("express-validator"));
var Cliente = require('../models/clientes');
var IVKey = "68576D5A7134743777217A25432A462D";
var getCliente = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context.sent;
          _context.next = 6;
          return pool.request().input('id', id).query(_database.queries.getAllProducts);
        case 6:
          result = _context.sent;
          res.json(result.recordset);
          _context.next = 14;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(500);
          res.send(_context.t0.message);
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function getCliente(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getCliente = getCliente;
var registro = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var password, cvc, pool, _yield$pool$request$q, recordset, codCli, newCodCli, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          if (!(req.body != null)) {
            _context2.next = 23;
            break;
          }
          password = Cliente.encryptCardNumber(req.body.PASS, IVKey);
          cvc = Cliente.encryptCardNumber(req.body.CVC, IVKey); //const tipoCliente = "cliente"//(req.body.TIPOUSUARIO != null) ? req.body.TIPOUSUARIO : "cliente";
          _context2.next = 6;
          return (0, _database.getConnection)();
        case 6:
          pool = _context2.sent;
          _context2.next = 9;
          return pool.request().query(_database.queries.getLastIdCLiente);
        case 9:
          _yield$pool$request$q = _context2.sent;
          recordset = _yield$pool$request$q.recordset;
          codCli = recordset[0].CODCLIENTE;
          newCodCli = codCli != null ? codCli + 1 : null;
          if (!(newCodCli == null)) {
            _context2.next = 16;
            break;
          }
          res.status(500);
          return _context2.abrupt("return", res.json({
            errorMessage: "Internal server error"
          }));
        case 16:
          _context2.next = 18;
          return pool.request().input('CODCLIENTE', newCodCli).input('NOMBRECLIENTE', req.body.NOMBRECLIENTE).input('CIF', req.body.CIF).input('DIRECCION1', req.body.DIRECCION1).input('CODPOSTAL', req.body.CODPOSTAL).input('POBLACION', req.body.POBLACION).input('PROVINCIA', req.body.PROVINCIA).input('PAIS', req.body.PAIS).input('TELEFONO1', req.body.TELEFONO1).input('E_MAIL', req.body.E_MAIL).input('USUARIO', req.body.USUARIO).input('PASS', password).input('NUMTARJETA', Cliente.maskCardNumber(req.body.NUMTARJETA)).input('TARCADUCIDAD', req.body.TARCADUCIDAD).input('CVC', cvc).query(_database.queries.addCliente);
        case 18:
          result = _context2.sent;
          console.log('OK');
          return _context2.abrupt("return", res.send(result.recordset));
        case 23:
          res.status(400);
          res.json({
            errorMessage: "INVALID_INPUT_FIELDS"
          });
        case 25:
          _context2.next = 31;
          break;
        case 27:
          _context2.prev = 27;
          _context2.t0 = _context2["catch"](0);
          res.status(500);
          res.send(_context2.t0.message);
        case 31:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 27]]);
  }));
  return function registro(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.registro = registro;
var login = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, _Cliente$decodeBase, _Cliente$decodeBase2, E_MAIL, PASS, user, password;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context3.sent;
          console.log(req.body.t);
          _Cliente$decodeBase = Cliente.decodeBase64Credentials(req.body.t), _Cliente$decodeBase2 = (0, _slicedToArray2["default"])(_Cliente$decodeBase, 2), E_MAIL = _Cliente$decodeBase2[0], PASS = _Cliente$decodeBase2[1];
          console.log(E_MAIL + ' ' + PASS);
          if (!(E_MAIL && PASS)) {
            _context3.next = 14;
            break;
          }
          _context3.next = 10;
          return pool.request().input('E_MAIL', E_MAIL).query(_database.queries.getClienteLogin);
        case 10:
          user = _context3.sent;
          if (user) {
            console.log(user.recordset[0].pass);
            password = Cliente.decryptCardNumber(user.recordset[0].pass, IVKey);
            if (Cliente.isValidPassword(password, user.recordset[0].pass)) {
              res.status(201);
              res.json({
                errorMessage: 'OK'
              });
            } else {
              res.status(404);
              res.json({
                errorMessage: "WRONG_PASSWORD"
              });
            }
          } else {
            res.status(404);
            res.json({
              errorMessage: "NOT_FOUND"
            });
          }
          _context3.next = 16;
          break;
        case 14:
          res.status(400);
          res.json({
            errorMessage: "INVALID_INPUT_FIELDS",
            fieldsErrors: JSON.stringify([{
              property: "name",
              constraints: {
                "isString": "name must be a string"
              }
            }, {
              property: "password",
              constraints: {
                "isString": "password must be a string"
              }
            }])
          });
        case 16:
          _context3.next = 22;
          break;
        case 18:
          _context3.prev = 18;
          _context3.t0 = _context3["catch"](0);
          res.status(500);
          res.send(_context3.t0.message);
        case 22:
          return _context3.abrupt("return", res);
        case 23:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 18]]);
  }));
  return function login(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.login = login;