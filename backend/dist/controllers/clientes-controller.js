"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verPedidos = exports.registro = exports.login = exports.insertFavoritos = exports.getFavoritos = exports.getCliente = exports.editarPerfil = exports.detallesPedidos = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var _expressValidator = _interopRequireDefault(require("express-validator"));
var Cliente = require('../models/clientes');
var _require = require('../utils/auth'),
  getTokenFromUser = _require.getTokenFromUser;
var IVKey = process.env.IVKey;
var mapearEstadoPedido = function mapearEstadoPedido(estado) {
  switch (estado) {
    case -1:
      return "Fallido";
    case 0:
      return "Creado";
    case 1:
      return "Pagado";
    case 2:
      return "Entregado";
    default:
      return "Desconocido";
  }
};
var getCliente = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var id, pool, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          id = req.params.id;
          _context.next = 4;
          return (0, _database.getConnection)();
        case 4:
          pool = _context.sent;
          _context.next = 7;
          return pool.request().input('id', id).query(_database.queries.getClienteId);
        case 7:
          result = _context.sent;
          if (result != null) {
            res.status(200).send(result.recordset[0]);
          } else {
            res.status(404).send({
              errorMessage: "NOT_FOUND"
            });
          }
          _context.next = 15;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          res.status(500);
          res.send({
            error: _context.t0.message
          });
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 11]]);
  }));
  return function getCliente(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getCliente = getCliente;
var registro = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var password, pool, _yield$pool$request$q, recordset, codCli, newCodCli, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          if (!(req.body != null)) {
            _context2.next = 22;
            break;
          }
          password = Cliente.encrypt(req.body.PASS, IVKey);
          _context2.next = 5;
          return (0, _database.getConnection)();
        case 5:
          pool = _context2.sent;
          _context2.next = 8;
          return pool.request().query(_database.queries.getLastIdCLiente);
        case 8:
          _yield$pool$request$q = _context2.sent;
          recordset = _yield$pool$request$q.recordset;
          codCli = recordset[0].CODCLIENTE;
          newCodCli = codCli != null ? codCli + 1 : null;
          if (!(newCodCli == null)) {
            _context2.next = 15;
            break;
          }
          res.status(500);
          return _context2.abrupt("return", res.send({
            error: "Internal server error"
          }));
        case 15:
          _context2.next = 17;
          return pool.request().input('CODCLIENTE', newCodCli).input('NOMBRECLIENTE', req.body.NOMBRECLIENTE).input('DIRECCION', req.body.DIRECCION1).input('CODPOSTAL', req.body.CODPOSTAL).input('POBLACION', req.body.POBLACION).input('PROVINCIA', req.body.PROVINCIA).input('TELEFONO', req.body.TELEFONO).input('EMAIL', req.body.E_MAIL).input('PASS', password).input('FECHAALTA', req.body.FECHAALTA).input('CIF', req.body.CIF).query(_database.queries.addCliente);
        case 17:
          result = _context2.sent;
          console.log('OK');
          return _context2.abrupt("return", res.send(result.recordset));
        case 22:
          res.status(400);
          res.send({
            error: "INVALID_INPUT_FIELDS"
          });
        case 24:
          _context2.next = 30;
          break;
        case 26:
          _context2.prev = 26;
          _context2.t0 = _context2["catch"](0);
          res.status(500);
          res.send({
            error: _context2.t0.message
          });
        case 30:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 26]]);
  }));
  return function registro(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.registro = registro;
var login = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var pool, _Cliente$decodeBase, _Cliente$decodeBase2, EMAIL, PASS, user, password, token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return (0, _database.getConnection)();
        case 3:
          pool = _context3.sent;
          _Cliente$decodeBase = Cliente.decodeBase64Credentials(req.body.t), _Cliente$decodeBase2 = (0, _slicedToArray2["default"])(_Cliente$decodeBase, 2), EMAIL = _Cliente$decodeBase2[0], PASS = _Cliente$decodeBase2[1];
          console.log(EMAIL + '/' + PASS);
          if (!(EMAIL && PASS)) {
            _context3.next = 13;
            break;
          }
          _context3.next = 9;
          return pool.request().input('EMAIL', EMAIL).query(_database.queries.getClienteLogin);
        case 9:
          user = _context3.sent;
          if (user && user.recordset[0].fechabaja == null) {
            password = Cliente.decrypt(user.recordset[0].pass, IVKey);
            if (Cliente.isValidPassword(password, user.recordset[0].pass)) {
              token = getTokenFromUser(user.recordset[0]);
              res.status(201).send({
                data: "OK",
                codcliente: user.recordset[0].codcliente,
                user: user.recordset[0].nombrecliente,
                token: token
              });
            } else {
              res.status(404).send({
                errorMessage: "WRONG_PASSWORD"
              });
            }
          } else {
            res.status(404).send({
              errorMessage: "USER_NOT_FOUND"
            });
          }
          _context3.next = 15;
          break;
        case 13:
          res.status(400);
          res.json({
            errorMessage: "INVALID_INPUT_FIELDS",
            fieldsErrors: [{
              property: "name",
              constraints: {
                "isString": "name must be a string"
              }
            }, {
              property: "password",
              constraints: {
                "isString": "password must be a string"
              }
            }]
          });
        case 15:
          _context3.next = 22;
          break;
        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](0);
          console.log({
            error: _context3.t0.message
          });
          res.status(500);
          res.send({
            error: _context3.t0.message
          });
        case 22:
          return _context3.abrupt("return", res);
        case 23:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 17]]);
  }));
  return function login(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.login = login;
var editarPerfil = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var id, pool, _req$body, NOMBRECLIENTE, DIRECCION, TELEFONO, user, updateFields, request, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _context4.prev = 1;
          if (!(req.body != null)) {
            _context4.next = 32;
            break;
          }
          _context4.next = 5;
          return (0, _database.getConnection)();
        case 5:
          pool = _context4.sent;
          _req$body = req.body, NOMBRECLIENTE = _req$body.NOMBRECLIENTE, DIRECCION = _req$body.DIRECCION, TELEFONO = _req$body.TELEFONO;
          _context4.next = 9;
          return pool.request().input('id', id).query(_database.queries.getClienteId);
        case 9:
          user = _context4.sent;
          if (!(user.recordset[0] != null)) {
            _context4.next = 29;
            break;
          }
          // Verificar si al menos un campo está presente en la solicitud
          updateFields = {};
          NOMBRECLIENTE ? updateFields.NOMBRECLIENTE = NOMBRECLIENTE : updateFields.NOMBRECLIENTE = null;
          DIRECCION ? updateFields.DIRECCION = DIRECCION : updateFields.DIRECCION = null;
          TELEFONO ? updateFields.TELEFONO = TELEFONO : updateFields.TELEFONO = null;
          id ? updateFields.CODCLIENTE = id : updateFields.CODCLIENTE = null;
          if (!(Object.keys(updateFields).length > 0)) {
            _context4.next = 26;
            break;
          }
          _context4.next = 19;
          return pool.request().input('CODCLIENTE', updateFields.CODCLIENTE) // Pasar el ID como parámetro para identificar el perfil a editar
          .input('NOMBRECLIENTE', updateFields.NOMBRECLIENTE).input('DIRECCION', updateFields.DIRECCION).input('TELEFONO', updateFields.TELEFONO);
        case 19:
          request = _context4.sent;
          _context4.next = 22;
          return request.execute(_database.queries.updateCliente);
        case 22:
          result = _context4.sent;
          if (result) res.status(201).send({
            data: "OK",
            message: "Usuario modificado correctamente"
          });
          _context4.next = 27;
          break;
        case 26:
          // Si ningún campo está presente en la solicitud, devolver un mensaje de error
          res.status(400).json({
            errorMessage: "Debe proporcionar al menos un campo para actualizar el perfil"
          });
        case 27:
          _context4.next = 30;
          break;
        case 29:
          res.status(404).send({
            errorMessage: "USER_TO_MODIFY_NOT_FOUND"
          });
        case 30:
          _context4.next = 34;
          break;
        case 32:
          res.status(400);
          res.send({
            error: "INVALID_INPUT_FIELDS"
          });
        case 34:
          _context4.next = 41;
          break;
        case 36:
          _context4.prev = 36;
          _context4.t0 = _context4["catch"](1);
          console.log({
            error: _context4.t0.message
          });
          res.status(500);
          res.send({
            error: _context4.t0.message
          });
        case 41:
          return _context4.abrupt("return", res);
        case 42:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 36]]);
  }));
  return function editarPerfil(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.editarPerfil = editarPerfil;
var verPedidos = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, pool, result, pedidos;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return (0, _database.getConnection)();
        case 4:
          pool = _context5.sent;
          _context5.next = 7;
          return pool.request().input('CODCLIENTE', id).query(_database.queries.getPedidosCliente);
        case 7:
          result = _context5.sent;
          if (result != null) {
            pedidos = result.recordset.map(function (pedido) {
              pedido.STATUS_PEDIDO = mapearEstadoPedido(pedido.STATUS_PEDIDO);
              return pedido;
            });
            res.status(200).json(pedidos);
          } else {
            res.status(404).send({
              errorMessage: "NOT_FOUND"
            });
          }
          _context5.next = 16;
          break;
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](1);
          console.log({
            error: _context5.t0.message
          });
          res.status(500);
          res.send({
            error: _context5.t0.message
          });
        case 16:
          return _context5.abrupt("return", res);
        case 17:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 11]]);
  }));
  return function verPedidos(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.verPedidos = verPedidos;
var detallesPedidos = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var _req$params, id, pedido, pool, resultPed, resultDet;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$params = req.params, id = _req$params.id, pedido = _req$params.pedido;
          _context6.prev = 1;
          _context6.next = 4;
          return (0, _database.getConnection)();
        case 4:
          pool = _context6.sent;
          _context6.next = 7;
          return pool.request().input('CODCLIENTE', id).query(_database.queries.getPedidosCliente);
        case 7:
          resultPed = _context6.sent;
          if (!(resultPed != null)) {
            _context6.next = 15;
            break;
          }
          _context6.next = 11;
          return pool.request().input('CODPEDIDO', pedido).query(_database.queries.getPedidoDetails);
        case 11:
          resultDet = _context6.sent;
          if (resultDet != null) {
            res.status(200).send(resultDet.recordset);
          } else {
            res.status(404).send({
              errorMessage: "NOT_FOUND"
            });
          }
          _context6.next = 16;
          break;
        case 15:
          res.status(404).send({
            errorMessage: "NOT_FOUND"
          });
        case 16:
          _context6.next = 23;
          break;
        case 18:
          _context6.prev = 18;
          _context6.t0 = _context6["catch"](1);
          console.log({
            error: _context6.t0.message
          });
          res.status(500);
          res.send({
            error: _context6.t0.message
          });
        case 23:
          return _context6.abrupt("return", res);
        case 24:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 18]]);
  }));
  return function detallesPedidos(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.detallesPedidos = detallesPedidos;
var getFavoritos = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    var id, pool, resultPed;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          id = req.params.id;
          _context7.prev = 1;
          _context7.next = 4;
          return (0, _database.getConnection)();
        case 4:
          pool = _context7.sent;
          _context7.next = 7;
          return pool.request().input('CODCLIENTE', id).execute(_database.queries.sp_GetArticulosFav);
        case 7:
          resultPed = _context7.sent;
          if (resultPed != null) {
            res.status(200).send(resultPed.recordset);
          } else {
            res.status(404).send({
              errorMessage: "NOT_FOUND"
            });
          }
          _context7.next = 16;
          break;
        case 11:
          _context7.prev = 11;
          _context7.t0 = _context7["catch"](1);
          console.log({
            error: _context7.t0.message
          });
          res.status(500);
          res.send({
            error: _context7.t0.message
          });
        case 16:
          return _context7.abrupt("return", res);
        case 17:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[1, 11]]);
  }));
  return function getFavoritos(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.getFavoritos = getFavoritos;
var insertFavoritos = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    var id, codigo, pool, resultPed;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          id = req.params.id;
          codigo = req.body.t;
          _context8.prev = 2;
          _context8.next = 5;
          return (0, _database.getConnection)();
        case 5:
          pool = _context8.sent;
          _context8.next = 8;
          return pool.request().input('CODCLIENTE', id).input('CODARTICULO', codigo.CODARTICULO).execute(_database.queries.sp_InserArticulosFavs);
        case 8:
          resultPed = _context8.sent;
          if (resultPed != null) {
            res.status(200).send();
          } else {
            res.status(404).send({
              errorMessage: "NOT_FOUND"
            });
          }
          _context8.next = 17;
          break;
        case 12:
          _context8.prev = 12;
          _context8.t0 = _context8["catch"](2);
          console.log({
            error: _context8.t0.message
          });
          res.status(500);
          res.send({
            error: _context8.t0.message
          });
        case 17:
          return _context8.abrupt("return", res);
        case 18:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[2, 12]]);
  }));
  return function insertFavoritos(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.insertFavoritos = insertFavoritos;