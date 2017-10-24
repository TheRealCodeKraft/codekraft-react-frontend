"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _storage = require("./storage/storage");

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STORAGE_KEY_FOR_TOKEN = "token";

var Auth = function Auth(store, ApiClient) {
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
      ApiClient.post("oauth/token", params, function (data) {
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

  return {
    getToken: getToken,
    storeToken: storeToken,
    checkForToken: checkForToken,
    login: login
  };
};

exports.default = Auth;