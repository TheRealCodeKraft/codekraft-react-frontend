'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _storage = require('./storage/storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Logger = require('js-logger');

var STORAGE_KEY_FOR_TOKEN = "token";

var ApiClient = function ApiClient(store) {
  var call = function call(method, endpoint, params, callback) {
    var offline = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var defaultParams = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

    var headers = {};

    if (!(params instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (offline) {
      headers['Authorization'] = 'bearer ' + process.env.APP_TOKEN;
    } else {
      if (defaultParams) {
        params['client_id'] = process.env.CLIENT_ID;
        params['client_secret'] = process.env.CLIENT_SECRET;
        params['grant_type'] = 'password';
      } else {
        var token = JSON.parse(_storage2.default.get(STORAGE_KEY_FOR_TOKEN)).access_token;
        headers['Authorization'] = 'bearer ' + token;
      }
    }
    var fetchParams = {
      method: method,
      headers: headers
    };

    switch (method) {
      case "post":
      case "put":
      case "patch":
        if (!(params instanceof FormData)) {
          fetchParams.body = JSON.stringify(params);
        } else {
          fetchParams.body = params;
        }
        break;
      case "get":
        if (params !== undefined) {
          var keys = Object.keys(params);
          if (keys.length > 0) {
            for (var paramIndex in keys) {
              endpoint += paramIndex == 0 ? "?" : "&";
              endpoint += keys[paramIndex] + "=" + params[keys[paramIndex]];
            }
          }
        }
        break;
      default:
        break;
    }

    Logger.debug({
      method: method,
      request: endpoint,
      headers: headers,
      data: params
    });

    fetch(process.env.API_URL + endpoint, fetchParams).then(function (promise) {
      promise.json().then(function (response) {

        /*if (response.json) response = response.json*/

        Logger.debug({
          method: method,
          response: endpoint,
          data: response
        });

        if (response.error) {
          if (response.error === "The access token expired") {
            refreshToken(callback);
          } else if (response.error === "The access token is invalid") {
            logout(callback);
          } else {
            callback(response);
          }
        } else if (callback) callback(response);
      });
    }).catch(function (exception) {

      Logger.debug({
        method: method,
        response: endpoint,
        exception: exception
      });

      if (callback) callback({ error: true, message: exception.message });
    });
    return;
  };

  var post = function post(endpoint, params, callback) {
    var offline = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var defaultParams = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    return call("post", endpoint, params, callback, offline, defaultParams);
  };

  var get = function get(endpoint, params, callback) {
    var offline = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    return call("get", endpoint, params, callback, offline);
  };

  var put = function put(endpoint, id, params, callback) {
    var offline = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    return call("put", endpoint + (id ? "/" + id : ""), params, callback, offline);
  };

  var patch = function patch(endpoint, id, params, callback) {
    return call("patch", endpoint + (id ? "/" + id : ""), params, callback);
  };

  var destroy = function destroy(endpoint, id, callback) {
    return call("delete", endpoint + "/" + id, undefined, callback);
  };

  var upload = function upload(endpoint, fieldName, file, callback) {
    var data = new FormData();
    data.append(fieldName, file);
    return call("put", endpoint, data, callback);
  };

  var refreshToken = function refreshToken(callback) {
    var refresh_token = getToken().refresh_token;
    post("oauth/token", { grant_type: "refresh_token", refresh_token: refresh_token }, function (data) {
      if (data.error) {
        if (callback) callback(data);
      } else {
        storeToken(data, callback);
      }
    });
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
      post("oauth/token", params, function (data) {
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
    get: get,
    post: post,
    put: put,
    patch: patch,
    destroy: destroy,
    upload: upload,

    refreshToken: refreshToken,
    logout: logout,
    getToken: getToken,
    storeToken: storeToken,
    checkForToken: checkForToken,
    login: login
  };
};

exports.default = ApiClient;