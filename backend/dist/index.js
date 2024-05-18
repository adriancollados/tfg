"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app"));
require("./database");
var _https = _interopRequireDefault(require("https"));
var _fs = _interopRequireDefault(require("fs"));
var _path = _interopRequireDefault(require("path"));
// Obtener rutas absolutas para los certificados
var certPath = _path["default"].resolve(__dirname, '../../../CertSSL/local.crt');
var keyPath = _path["default"].resolve(__dirname, '../../../CertSSL/local.key');
// Cargar el certificado y la clave privada
var options = {
  key: _fs["default"].readFileSync(keyPath),
  cert: _fs["default"].readFileSync(certPath)
};
_https["default"].createServer(options, _app["default"]).listen(_app["default"].get('port'), function () {
  console.log('Servidor HTTPS escuchando en el puerto 443');
});