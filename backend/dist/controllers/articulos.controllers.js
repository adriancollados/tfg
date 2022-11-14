"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateArticulos = exports.getArticulosCount = exports.getArticulos = exports.getArticulo = exports.deleteArticulos = exports.createArticulos = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var getArticulos = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var pool, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
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
      while (1) {
        switch (_context2.prev = _context2.next) {
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
              res.send("El articulo no se ha encontrado");
            }
            res.json(result.recordset[0]);
            _context2.next = 16;
            break;
          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](1);
            res.status(500);
            res.send(_context2.t0.message);
          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 12]]);
  }));
  return function getArticulo(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getArticulo = getArticulo;
var getArticulosCount = function getArticulosCount(req, res) {
  res.send("Hola");
};
exports.getArticulosCount = getArticulosCount;
var createArticulos = function createArticulos(req, res) {
  res.send("Hola");
};
exports.createArticulos = createArticulos;
var deleteArticulos = function deleteArticulos(req, res) {
  res.send("Hola");
};
exports.deleteArticulos = deleteArticulos;
var updateArticulos = function updateArticulos(req, res) {
  res.send("Hola");
};
exports.updateArticulos = updateArticulos;