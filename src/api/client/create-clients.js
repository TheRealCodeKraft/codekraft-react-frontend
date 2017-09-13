import _ApiClient from './api-client'

import UserClient from './user'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function(config, store) {

  const ApiClient = _ApiClient(store)

  var coreClients = {
    ApiClient: ApiClient,
    UserClient: UserClient(store, ApiClient)
  }

  for (var index in config) {
 
    var localConfig, clientName, plural
    if (config[index] instanceof Object) {
      localConfig = config[index]
      clientName = localConfig.name
      plural = localConfig.plural ? localConfig.plural : clientName + "s"
    } else {
      clientName = config[index]
      plural = clientName + "s"
    }

    coreClients[capitalizeFirstLetter(clientName) + "Client"] = (function(name, plural, store, ApiClient) { return function() {

      var fetchAll = function(params, callback) {
        ApiClient.get(plural, params, function(data) {
          var toDispatch = {
            type: plural.toUpperCase()
          }
          toDispatch[plural] = data
          store.dispatch(toDispatch)
          if (callback) callback(data)
        })
      }

      var fetchOne = function(id, callback) {
        ApiClient.get(plural + "/" + id, {}, function(data) {
          var toDispatch = {
            type: name.toUpperCase()
          }
          toDispatch[name] = data
          store.dispatch(toDispatch)
          if (callback) callback(data)
        })
      }

      var create = function(params, callback) {
        ApiClient.post(plural, params, function(data) {
          if (!data.error) {
            var toDispatch = {
              type: "NEW_" + name.toUpperCase()
            }
            toDispatch[name] = data
            store.dispatch(toDispatch)
          }
          if (callback) callback(data)
        })
      }

      var update = function(id, params, callback) {
        ApiClient.put(plural, id, params, function(data) {
          var toDispatch = {
            type: "UPDATE_" + name.toUpperCase()
          }
          toDispatch[name] = data
          store.dispatch(toDispatch)
          if (callback) callback(data)
        })
      }

      var destroy = function(id, callback) {
        ApiClient.destroy(plural, id, function(data) {
          store.dispatch({
            type: "DESTROY_" + name.toUpperCase(),
            id: data.id
          })
          if (callback) callback(data)
        })
      }

      var functions = {
        name: name,
        plural: plural,

        fetchAll: fetchAll,
        fetchOne: fetchOne,
        create: create,
        update: update,
        destroy: destroy,
      }

      if (localConfig.client) {
        var funx = localConfig.client(name, plural, store)
        var key
        for(var key in funx) {
          functions[key] = funx[key]
        }
console.dir(functions)
      }

      return functions

    }()})(clientName, plural, store, ApiClient)
  }

  return coreClients
}
