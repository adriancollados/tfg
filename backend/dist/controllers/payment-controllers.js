"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makePayment = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _database = require("../database");
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var stripe = require('stripe')('sk_test_51PGob9FFZqdYKyWkKMZh8dXfocdLdwGiv8rNCByI3GVzCZLiem39mFBrNIH47U8zvdGxAZgArK6E2BfIuCnQMnKt00QPVvM0sE');
var isStringNullOrEmpty = function isStringNullOrEmpty(string) {
  if (string === null || string === '') return true;
};
var makePayment = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data, token, contador, pool, codigoPostalCode, codigos, _codigos$recordset$fi, CODPOSTAL, LOCALIDAD, result, orderId, amount, charge, _iterator, _step, linped, resultLinped;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          data = JSON.parse(atob(req.body.t));
          token = req.body.token;
          _context.prev = 2;
          if (!(req.body != null)) {
            _context.next = 63;
            break;
          }
          contador = 0;
          _context.next = 7;
          return (0, _database.getConnection)();
        case 7:
          pool = _context.sent;
          codigoPostalCode = parseInt(data.codigoPostal);
          _context.next = 11;
          return pool.request().query(_database.queries.getPostalCodes);
        case 11:
          codigos = _context.sent;
          if (!codigos.recordset.some(function (codigo) {
            return codigo.CODPOSTAL === codigoPostalCode;
          })) {
            _context.next = 59;
            break;
          }
          _codigos$recordset$fi = codigos.recordset.find(function (codigo) {
            return codigo.CODPOSTAL === codigoPostalCode;
          }), CODPOSTAL = _codigos$recordset$fi.CODPOSTAL, LOCALIDAD = _codigos$recordset$fi.LOCALIDAD;
          _context.next = 16;
          return pool.request().input('CODCLIENTE', data.user).input('TOTAL', data.total).input('DIR_ENVIO', data.direccion).input('CODPOSTAL', CODPOSTAL).input('LOCALIDAD', LOCALIDAD).input('INFO_PEDIDO', data.horaEntrega).input('PAYMENT_ID', token.id).execute(_database.queries.sp_makePayment);
        case 16:
          result = _context.sent;
          if (!(result != null)) {
            _context.next = 57;
            break;
          }
          orderId = result.recordset[0].CODPEDIDO.toString(); // Ejemplo de ID de pedido
          amount = parseInt(data.total * 100); // Crea el cargo utilizando el token de tarjeta y los detalles del pedido
          _context.next = 22;
          return stripe.paymentIntents.create({
            amount: amount,
            currency: "EUR",
            payment_method: token.id,
            confirm: true,
            return_url: 'http://localhost:19006/',
            // URL de retorno después del pago
            automatic_payment_methods: {
              enabled: true,
              // Habilitar métodos de pago automáticos
              allow_redirects: 'never' // No permitir redirecciones de página completa
            },

            metadata: {
              pedido: JSON.stringify(data)
            }
          });
        case 22:
          charge = _context.sent;
          if (!(charge.status === 'succeeded')) {
            _context.next = 53;
            break;
          }
          _iterator = _createForOfIteratorHelper(data.carrito);
          _context.prev = 25;
          _iterator.s();
        case 27:
          if ((_step = _iterator.n()).done) {
            _context.next = 35;
            break;
          }
          linped = _step.value;
          _context.next = 31;
          return pool.request().input('CODPEDIDO', orderId).input('CODARTICULO', linped.articulo.CODARTICULO).input('DESCRIPCION', linped.articulo.DESCRIPCION).input('CANTIDAD', linped.cantidad).input('PVP', linped.articulo.PVPNETO).input('COMENTARIO', !isStringNullOrEmpty(linped.comentario) ? linped.comentario : null).execute(_database.queries.sp_insertLinpeds);
        case 31:
          resultLinped = _context.sent;
          if (resultLinped.recordset[0].RESULT === 'OK') {
            contador = contador + 1;
          } else {
            res.status(400);
            console.log(resultLinped.recordset[0].RESULT);
            res.send({
              error: resultLinped.recordset[0].RESULT
            });
          }
        case 33:
          _context.next = 27;
          break;
        case 35:
          _context.next = 40;
          break;
        case 37:
          _context.prev = 37;
          _context.t0 = _context["catch"](25);
          _iterator.e(_context.t0);
        case 40:
          _context.prev = 40;
          _iterator.f();
          return _context.finish(40);
        case 43:
          if (!(contador == data.carrito.length)) {
            _context.next = 49;
            break;
          }
          _context.next = 46;
          return pool.request().input('id', orderId).query(_database.queries.updatePedidoOK);
        case 46:
          res.status(200).json({
            message: 'Pago procesado correctamente'
          });
          _context.next = 51;
          break;
        case 49:
          res.status(400);
          res.send({
            error: "NOT_ALL_LINPEDS_INSERTED"
          });
        case 51:
          _context.next = 57;
          break;
        case 53:
          res.status(502);
          res.send({
            error: "PAYMENT_ERROR"
          });
          _context.next = 57;
          return pool.request().input('id', orderId).query(_database.queries.updatePedidoKO);
        case 57:
          _context.next = 61;
          break;
        case 59:
          res.status(404);
          res.send({
            error: "INVALID_CODPOSTAL_INPUT"
          });
        case 61:
          _context.next = 65;
          break;
        case 63:
          res.status(400);
          res.send({
            error: "INVALID_INPUT_FIELDS"
          });
        case 65:
          _context.next = 72;
          break;
        case 67:
          _context.prev = 67;
          _context.t1 = _context["catch"](2);
          res.status(500);
          console.log(_context.t1);
          res.send({
            error: _context.t1.message
          });
        case 72:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[2, 67], [25, 37, 40, 43]]);
  }));
  return function makePayment(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.makePayment = makePayment;