"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _morgan = _interopRequireDefault(require("morgan"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _articulosRoutes = _interopRequireDefault(require("./routes/articulosRoutes"));
var _clientesRoutes = _interopRequireDefault(require("./routes/clientesRoutes"));
var _categoriaRoutes = _interopRequireDefault(require("./routes/categoriaRoutes"));
var _paymentRoutes = _interopRequireDefault(require("./routes/paymentRoutes"));
var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));
var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));
var _swaggerOptions = require("./swaggerOptions");
var specs = (0, _swaggerJsdoc["default"])(_swaggerOptions.options);
var app = (0, _express["default"])();
app.set('port', process.env.PORT);
app.use((0, _morgan["default"])("dev"));
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use(_bodyParser["default"].json());
app.use((0, _cors["default"])({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(_articulosRoutes["default"]);
app.use(_clientesRoutes["default"]);
app.use(_categoriaRoutes["default"]);
app.use(_paymentRoutes["default"]);
app.use("/docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(specs));
module.exports = app;