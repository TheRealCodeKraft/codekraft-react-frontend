'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _jsLogger = require('js-logger');

var _jsLogger2 = _interopRequireDefault(_jsLogger);

var _storage = require('./storage/storage');

var _storage2 = _interopRequireDefault(_storage);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STORAGE_KEY_FOR_TOKEN = "token";

var ApiClient = function () {
  var call = function call(method, endpoint, params, callback) {
    var offline = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var defaultParams = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

    var headers = {};

    if (!(params instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    if (offline) {
      headers['Authorization'] = 'bearer ' + _config2.default.api.app_token;
    } else {
      if (defaultParams) {
        params['client_id'] = _config2.default.api.clientId;
        params['client_secret'] = _config2.default.api.clientSecret;
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
        if (params !== undefined && params.length > 0) {
          var keys = Object.getKeys(params);
          for (var paramIndex in keys) {
            endpoint += paramIndex === 0 ? "?" : "&";
            endpoint += keys[paramIndex] + "=" + params[keys[paramIndex]];
          }
        }
        break;
      default:
        break;
    }

    _jsLogger2.default.debug({
      method: method,
      request: endpoint,
      headers: headers,
      data: params
    });

    fetch(_config2.default.api.url + endpoint, fetchParams).then(function (promise) {
      promise.json().then(function (response) {

        _jsLogger2.default.debug({
          method: method,
          response: endpoint,
          data: response
        });

        if (response.error) {
          if (response.error === "The access token expired") {
            _auth2.default.refreshToken(callback);
          } else if (response.error === "The access token is invalid") {
            _auth2.default.logout(callback);
          } else {
            callback(response);
          }
        } else if (callback) callback(response);
      });
    }).catch(function (exception) {

      _jsLogger2.default.debug({
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
    return call("put", endpoint + (id ? "/" + id : ""), params, callback);
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

  return {
    get: get,
    post: post,
    put: put,
    patch: patch,
    destroy: destroy,
    upload: upload
  };
}();

exports.default = BaseClient;