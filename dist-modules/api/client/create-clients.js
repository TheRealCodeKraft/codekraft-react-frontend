'use strict';

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (config, store) {
  return {
    AuthClient: (0, _auth2.default)(store),
    UserClient: (0, _user2.default)(store)
  };
};