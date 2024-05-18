"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _dotenv = require("dotenv");
(0, _dotenv.config)();
var _default = {
  port: process.env.PORT,
  dbUser: process.env.USER || '',
  dbPassword: process.env.PASSWORD || '',
  dbserver: process.env.SERVER || '',
  dbDatabase: process.env.DATABASE || '',
  ivKey: process.env.IVKey
};
exports["default"] = _default;