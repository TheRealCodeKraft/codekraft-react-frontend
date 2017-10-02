'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFound = function NotFound() {
  return _react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      'h3',
      null,
      '404 page not found'
    ),
    _react2.default.createElement(
      'p',
      null,
      'We are sorry but the page you are looking for does not exist.'
    )
  );
};

exports.default = NotFound;