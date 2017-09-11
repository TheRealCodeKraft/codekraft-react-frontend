import ApiClient from './api-client'

import AuthClient from './auth'
import UserClient from './user'

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function(config, store) {
  var coreClients = {
    AuthClient: AuthClient(store),
    UserClient: UserClient(store)
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

    coreClients[capitalizeFirstLetter(clientName) + "Client"] = (function(name, plural, store) { return function() {

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

      if (config.client) {
        var funx = config.client(name, plural, store)
        var key
        for(var i in funcs) {
          key = Object.keys(funx)[i]
          functions[key] = funx[i]
        }
      }

      return functions

    }()})(clientName, plural, store)
  }

  return coreClients
}
