"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _app = _interopRequireDefault(require("./app"));
require("./database");
_app["default"].listen(_app["default"].get('port'));
console.log("Server listening on port 3000");