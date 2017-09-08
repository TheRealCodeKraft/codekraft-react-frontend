'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _apiClient = require('./api-client');

var _apiClient2 = _interopRequireDefault(_apiClient);

var _storage = require('./storage/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STORAGE_KEY_FOR_TOKEN = "token";

var Auth = function Auth(store) {
  var getToken = function getToken() {
    var storageToken = _storage2.default.get(STORAGE_KEY_FOR_TOKEN);
    var token = null;
    if (storageToken) token = JSON.parse(storageToken);

    store.dispatch({
      type: "TOKEN",
      token: token
    });

    return token;
  };

  var setToken = function setToken(token) {
    _storage2.default.set(STORAGE_KEY_FOR_TOKEN, JSON.stringify(token));

    store.dispatch({
      type: "TOKEN",
      token: token
    });
  };

  var refreshToken = function refreshToken(callback) {
    var refresh_token = getToken().refresh_token;
    _apiClient2.default.post("oauth/token", { grant_type: "refresh_token", refresh_token: refresh_token }, function (data) {
      if (data.error) {
        if (callback) callback(data);
      } else {
        storeToken(data, callback);
      }
    });
  };

  var storeToken = function storeToken(data, callback) {
    setToken(data);
    callback(data);
  };

  var login = function login(params, callback) {
    if (checkForToken()) {
      logout(function () {
        login(params, callback);
      });
    } else {
      params["grant_type"] = "password";
      _apiClient2.default.post("oauth/token", params, function (data) {
        if (data.error) {
          if (callback) callback(data);
        } else {
          storeToken(data, callback);
        }
      }, false, true);
    }
  };

  var checkForToken = function checkForToken() {
    var token = _storage2.default.get(STORAGE_KEY_FOR_TOKEN);
    if (token) {
      return true;
    } else {
      return false;
    }
  };

  var logout = function logout(callback) {
    _storage2.default.delete(STORAGE_KEY_FOR_TOKEN);
    store.dispatch({
      type: "TOKEN",
      token: null
    });

    store.dispatch({
      type: "USER_NOT_FOUND"
    });
    if (callback) callback();
  };

  return {
    getToken: getToken,
    refreshToken: refreshToken,
    storeToken: storeToken,
    checkForToken: checkForToken,
    login: login,
    logout: logout
  };
};

exports.default = Auth;