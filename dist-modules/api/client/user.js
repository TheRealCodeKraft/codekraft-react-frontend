'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiClient = require('./api-client');

var _apiClient2 = _interopRequireDefault(_apiClient);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserClient = function UserClient(store) {
  var AuthClient = (0, _auth2.default)(store);
  var name = "user",
      plural = "users";

  var fetchAll = function fetchAll(params, callback) {
    _apiClient2.default.get("users", params, function (data) {
      store.dispatch({
        type: "USERS",
        users: data
      });
      if (callback) callback(data);
    });
  };

  var signup = function signup(params, callback) {
    _apiClient2.default.post("users", params, callback, true);
    _apiClient2.default.post("users", params, function (data) {
      store.dispatch({
        type: "SIGNUP",
        user: data
      });
      if (callback) callback(data);
    }, true);
  };

  var me = function me(callback) {
    if (AuthClient.checkForToken()) {
      _apiClient2.default.get("users/me", {}, function (data) {
        if (data.error) {
          if (callback) callback(data);
        } else {
          store.dispatch({
            type: "ME",
            user: data
          });
          if (callback) callback(data);
        }
      });
    } else {
      callback({ error: "Unable to find some token" });
    }
  };

  var resetMe = function resetMe(callback) {
    store.dispatch({
      type: "RESET_ME"
    });
  };

  var update = function update(id, params, callback) {
    _apiClient2.default.put("users", id, params, function (data) {
      if (!data.error) {
        store.dispatch({
          type: "ME",
          user: data
        });
      }
      if (callback) callback(data);
    });
  };

  var updatePassword = function updatePassword(id, params, callback) {
    _apiClient2.default.put("users/password", id, params, callback);
  };

  return {
    name: name,
    plural: plural,
    fetchAll: fetchAll,
    signup: signup,
    me: me,
    resetMe: resetMe,
    update: update,
    updatePassword: updatePassword
  };
};

exports.default = UserClient;