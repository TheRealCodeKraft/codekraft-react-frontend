'use strict';

var _apiClient = require('./api-client');

var _apiClient2 = _interopRequireDefault(_apiClient);

var _auth = require('./auth');

var _auth2 = _interopRequireDefault(_auth);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function (config, store) {
  var coreClients = {
    AuthClient: (0, _auth2.default)(store),
    UserClient: (0, _user2.default)(store)
  };

  for (var index in config) {

    var localConfig, clientName, plural;
    if (config[index] instanceof Object) {
      localConfig = config[index];
      clientName = localConfig.name;
      plural = localConfig.plural ? localConfig.plural : clientName + "s";
    } else {
      clientName = config[index];
      plural = clientName + "s";
    }

    coreClients[capitalizeFirstLetter(clientName) + "Client"] = function (name, plural, store) {
      return function () {

        var fetchAll = function fetchAll(params, callback) {
          _apiClient2.default.get(plural, params, function (data) {
            var toDispatch = {
              type: plural.toUpperCase()
            };
            toDispatch[plural] = data;
            store.dispatch(toDispatch);
            if (callback) callback(data);
          });
        };

        var fetchOne = function fetchOne(id, callback) {
          _apiClient2.default.get(plural + "/" + id, {}, function (data) {
            var toDispatch = {
              type: name.toUpperCase()
            };
            toDispatch[name] = data;
            store.dispatch(toDispatch);
            if (callback) callback(data);
          });
        };

        var create = function create(params, callback) {
          _apiClient2.default.post(plural, params, function (data) {
            if (!data.error) {
              var toDispatch = {
                type: "NEW_" + name.toUpperCase()
              };
              toDispatch[name] = data;
              store.dispatch(toDispatch);
            }
            if (callback) callback(data);
          });
        };

        var update = function update(id, params, callback) {
          _apiClient2.default.put(plural, id, params, function (data) {
            var toDispatch = {
              type: "UPDATE_" + name.toUpperCase()
            };
            toDispatch[name] = data;
            store.dispatch(toDispatch);
            if (callback) callback(data);
          });
        };

        var destroy = function destroy(id, callback) {
          _apiClient2.default.destroy(plural, id, function (data) {
            store.dispatch({
              type: "DESTROY_" + name.toUpperCase(),
              id: data.id
            });
            if (callback) callback(data);
          });
        };

        var functions = {
          name: name,
          plural: plural,

          fetchAll: fetchAll,
          fetchOne: fetchOne,
          create: create,
          update: update,
          destroy: destroy
        };

        if (config.client) {
          var funx = config.client(name, plural, store);
          var key;
          for (var i in funcs) {
            key = Object.keys(funx)[i];
            functions[key] = funx[i];
          }
        }

        return functions;
      }();
    }(clientName, plural, store);
  }

  return coreClients;
};