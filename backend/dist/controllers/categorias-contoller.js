"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCategory = exports.getArticuloOSeccionOnCategoryId = exports.getArticuloInSeccion = exports.getAllCategorias = exports.deleteCategory = exports.createCategory = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
var articuloController = require("../controllers/articulos-controllers");
var getAllCategorias = /*#__PURE__*/function () {
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
          return pool.request().query(_database.queries.getAllCategorias);
        case 6:
          result = _context.sent;
          if (result != null) {
            res.status(200).send(result.recordset);
          } else {
            res.status(404).send({
              errorMessage: "NOT_FOUND"
            });
          }
          _context.next = 13;
          break;
        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          res.status(500).send({
            error: _context.t0.message
          });
        case 13:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 10]]);
  }));
  return function getAllCategorias(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.getAllCategorias = getAllCategorias;
var getArticuloOSeccionOnCategoryId = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, arraySecciones, existeId, pool, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          id = req.params.id;
          _context2.prev = 1;
          // Convertir la cadena en un array utilizando la coma como delimitador
          arraySecciones = _database.queries.listaSeccionesConCategoria.split(',').map(function (item) {
            return parseInt(item.trim(), 10);
          }); // Verificar si el id está presente en el array
          existeId = arraySecciones.includes(parseInt(id, 10));
          if (!existeId) {
            _context2.next = 14;
            break;
          }
          _context2.next = 7;
          return (0, _database.getConnection)();
        case 7:
          pool = _context2.sent;
          _context2.next = 10;
          return pool.request().input('id', id).query(_database.queries.getSeccionesFromCategoriaID);
        case 10:
          result = _context2.sent;
          if (result.recordset.length === 0) {
            res.status(404).send({
              message: "La categoría no se ha encontrado"
            });
          } else {
            res.json({
              categorias: result.recordset
            });
          }
          _context2.next = 17;
          break;
        case 14:
          _context2.next = 16;
          return articuloController.getArticulosFromCategoria(req, res);
        case 16:
          ;
        case 17:
          _context2.next = 22;
          break;
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](1);
          res.status(500).send({
            error: _context2.t0.message
          });
        case 22:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[1, 19]]);
  }));
  return function getArticuloOSeccionOnCategoryId(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getArticuloOSeccionOnCategoryId = getArticuloOSeccionOnCategoryId;
var getArticuloInSeccion = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var id, arraySecciones, existeId, pool, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          // Convertir la cadena en un array utilizando la coma como delimitador
          arraySecciones = _database.queries.listaSeccionesConCategoria.split(',').map(function (item) {
            return parseInt(item.trim(), 10);
          }); // Verificar si el id está presente en el array
          existeId = arraySecciones.includes(parseInt(id, 10));
          if (!existeId) {
            _context3.next = 14;
            break;
          }
          _context3.next = 7;
          return (0, _database.getConnection)();
        case 7:
          pool = _context3.sent;
          _context3.next = 10;
          return pool.request().input('id', id).query(_database.queries.getSeccionesFromCategoriaID);
        case 10:
          result = _context3.sent;
          res.json(result.recordset);
          _context3.next = 15;
          break;
        case 14:
          res.status(404).send({
            message: "La seccion no se ha encontrado"
          });
        case 15:
          _context3.next = 20;
          break;
        case 17:
          _context3.prev = 17;
          _context3.t0 = _context3["catch"](1);
          res.status(500).send({
            error: _context3.t0.message
          });
        case 20:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 17]]);
  }));
  return function getArticuloInSeccion(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getArticuloInSeccion = getArticuloInSeccion;
var createCategory = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var name, pool, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          name = req.body.name;
          _context4.prev = 1;
          _context4.next = 4;
          return (0, _database.getConnection)();
        case 4:
          pool = _context4.sent;
          _context4.next = 7;
          return pool.request().input('name', _database.sql.VarChar, name).query(_database.queries.createCategory);
        case 7:
          result = _context4.sent;
          res.status(201).json(result.recordset[0]);
          _context4.next = 14;
          break;
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](1);
          res.status(500).send({
            error: _context4.t0.message
          });
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[1, 11]]);
  }));
  return function createCategory(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.createCategory = createCategory;
var updateCategory = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id, name, pool, result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          name = req.body.name;
          _context5.prev = 2;
          _context5.next = 5;
          return (0, _database.getConnection)();
        case 5:
          pool = _context5.sent;
          _context5.next = 8;
          return pool.request().input('id', _database.sql.Int, id).input('name', _database.sql.VarChar, name).query(_database.queries.updateCategory);
        case 8:
          result = _context5.sent;
          if (result.rowsAffected[0] === 0) {
            res.status(404).send({
              message: "La categoría no se ha encontrado"
            });
          } else {
            res.status(204).send();
          }
          _context5.next = 15;
          break;
        case 12:
          _context5.prev = 12;
          _context5.t0 = _context5["catch"](2);
          res.status(500).send({
            error: _context5.t0.message
          });
        case 15:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[2, 12]]);
  }));
  return function updateCategory(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.updateCategory = updateCategory;
var deleteCategory = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var id, pool, result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          id = req.params.id;
          _context6.prev = 1;
          _context6.next = 4;
          return (0, _database.getConnection)();
        case 4:
          pool = _context6.sent;
          _context6.next = 7;
          return pool.request().input('id', _database.sql.Int, id).query(_database.queries.deleteCategory);
        case 7:
          result = _context6.sent;
          if (result.rowsAffected[0] === 0) {
            res.status(404).send('La categoría no se ha encontrado');
          } else {
            res.status(204).send();
          }
          _context6.next = 14;
          break;
        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](1);
          res.status(500).send({
            error: _context6.t0.message
          });
        case 14:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 11]]);
  }));
  return function deleteCategory(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.deleteCategory = deleteCategory;