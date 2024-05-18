"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateArticulos = exports.getArticulosFromSeccionCategoria = exports.getArticulosFromSeccion = exports.getArticulosFromCategoria = exports.getArticulosCount = exports.getArticulos = exports.getArticulo = exports.deleteArticulos = exports.createArticulos = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getArticulos = /*#__PURE__*/function () {
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
          return pool.request().query(_database.queries.getAllProducts);
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
  return function getArticulos(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getArticulos = getArticulos;
var getArticulo = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, pool, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return (0, _database.getConnection)();
        case 4:
          pool = _context2.sent;
          _context2.next = 7;
          return pool.request().input('id', id).query(_database.queries.getArticuloId);
        case 7:
          result = _context2.sent;
          if (result == null) {
            res.status(404);
            res.send({
              message: "El articulo no se ha encontrado"
            });
          } else {
            res.json(result.recordset[0]);
          }
          _context2.next = 15;
          break;
        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](1);
          res.status(500);
          res.send(_context2.t0.message);
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 11]]);
  }));
  return function getArticulo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getArticulo = getArticulo;
var getArticulosFromSeccion = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, pool, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return (0, _database.getConnection)();
        case 4:
          pool = _context3.sent;
          _context3.next = 7;
          return pool.request().input('id', id).query(_database.queries.getArticulosFromSeccion);
        case 7:
          result = _context3.sent;
          if (result == null) {
            res.status(404);
            res.send({
              message: "El articulo no se ha encontrado"
            });
          } else {
            res.json(result.recordset);
          }
          _context3.next = 15;
          break;
        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](1);
          res.status(500);
          res.send(_context3.t0.message);
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 11]]);
  }));
  return function getArticulosFromSeccion(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getArticulosFromSeccion = getArticulosFromSeccion;
var getArticulosFromSeccionCategoria = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$params, categoriaId, seccionId, _req$query, _req$query$pageNumber, pageNumber, _req$query$pageSize, pageSize, pool, startIndex, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _req$params = req.params, categoriaId = _req$params.categoriaId, seccionId = _req$params.seccionId;
          _req$query = req.query, _req$query$pageNumber = _req$query.pageNumber, pageNumber = _req$query$pageNumber === void 0 ? 1 : _req$query$pageNumber, _req$query$pageSize = _req$query.pageSize, pageSize = _req$query$pageSize === void 0 ? 15 : _req$query$pageSize; // Configuración de la paginación
          _context4.prev = 2;
          _context4.next = 5;
          return (0, _database.getConnection)();
        case 5:
          pool = _context4.sent;
          startIndex = (pageNumber - 1) * pageSize; // Índice inicial de la paginación
          _context4.next = 9;
          return pool.request().input('categoriaId', categoriaId).input('seccionId', seccionId).input('startIndex', startIndex).input('pageSize', pageSize).query(_database.queries.getArticulosFromSeccionCategoria);
        case 9:
          result = _context4.sent;
          if (!result.recordset || result.recordset.length === 0) {
            res.status(404).send({
              message: "No se encontraron artículos para la categoría y sección especificadas"
            });
          } else {
            res.json(result.recordset);
          }
          _context4.next = 16;
          break;
        case 13:
          _context4.prev = 13;
          _context4.t0 = _context4["catch"](2);
          res.status(500).send({
            error: _context4.t0.message
          });
        case 16:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 13]]);
  }));
  return function getArticulosFromSeccionCategoria(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getArticulosFromSeccionCategoria = getArticulosFromSeccionCategoria;
var getArticulosFromCategoria = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, pool, result;
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
          return pool.request().input('id', id).query(_database.queries.getArticulosFromCategoria);
        case 7:
          result = _context5.sent;
          if (result == null || result.recordset.length === 0) {
            res.status(404);
            res.send({
              message: "No se han encontrado articulos"
            });
          } else {
            res.json(result.recordset);
          }
          _context5.next = 15;
          break;
        case 11:
          _context5.prev = 11;
          _context5.t0 = _context5["catch"](1);
          res.status(500);
          res.send(_context5.t0.message);
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 11]]);
  }));
  return function getArticulosFromCategoria(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.getArticulosFromCategoria = getArticulosFromCategoria;
var getArticulosCount = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          res.send("Hola");
        case 1:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function getArticulosCount(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getArticulosCount = getArticulosCount;
var createArticulos = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          res.send("Hola");
        case 1:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function createArticulos(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();
exports.createArticulos = createArticulos;
var deleteArticulos = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          res.send("Hola");
        case 1:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function deleteArticulos(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}();
exports.deleteArticulos = deleteArticulos;
var updateArticulos = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          res.send("Hola");
        case 1:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function updateArticulos(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();
exports.updateArticulos = updateArticulos;