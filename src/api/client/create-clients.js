import _ApiClient from './api-client'

import UserClient from './user'

function capitalizeFirstLetter(string) {
  string = string.charAt(0).toUpperCase() + string.slice(1)
  var index, str
  while((index = string.indexOf('_')) !== -1) {
    if (index < string.length - 1) {
      str = string[index] + string[index + 1]
      string = string.replace(str, string[index + 1].toUpperCase())
    } else {
      string = string.replace('_', '')
    }
  }
  return string
}

function createClient(name, plural, store, ApiClient, localConfig) {
  return (function(name, plural, store, ApiClient) { return function() {

      var fetchAll = function(params, callback, offline=false, append=false) {
        ApiClient.get(plural, params, function(data) {
          var toDispatch = {
            type: plural.toUpperCase()
          }
          toDispatch[plural] = data
          toDispatch["append"] = append
          store.dispatch(toDispatch)
          if (callback) callback(data)
        }, offline)
      }

      var fetchOne = function(id, callback, offline=false) {
        ApiClient.get(plural + "/" + id, {}, function(data) {
          var toDispatch = {
            type: name.toUpperCase()
          }
          toDispatch[name] = data
          store.dispatch(toDispatch)
          if (callback) callback(data)
        }, offline)
      }

      var create = function(params, callback, offline=false) {
        ApiClient.post(plural, params, function(data) {
          if (!data.error) {
            var toDispatch = {
              type: "NEW_" + name.toUpperCase()
            }
            toDispatch[name] = data
            store.dispatch(toDispatch)
          }
          if (callback) callback(data)
        }, offline)
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

      var upload = function(id, fieldName, file, callback) {
        ApiClient.upload(plural + '/' + id + '/' + fieldName, fieldName, file, function(data) {
          var toDispatch = {
            type: "UPDATE_" + name.toUpperCase()
          }
          toDispatch[name] = data
          store.dispatch(toDispatch)
          if (callback) callback(data)
        })
      }

      var deleteFile = function(id, fieldName, callback) {
        ApiClient.destroy(plural, id + "/" + fieldName, function(data) {
          var toDispatch = {
            type: "UPDATE_" + name.toUpperCase()
          }
          toDispatch[name] = data
          store.dispatch(toDispatch)
          if (callback) callback(data)
        })
      }

      var pushInState = function(data, update=true, target=undefined, callback) {
        var toDispatch = {
          type: (update ? "UPDATE_" : "NEW_") + name.toUpperCase()
        }
        toDispatch[name] = data
        store.dispatch(toDispatch)
        if (target) {
          toDispatch = {type: target}
          toDispatch[name] = data
console.log(toDispatch)
          store.dispatch(toDispatch)
        }
				if (callback) callback()
      }

      var functions = {
        name: name,
        plural: plural,

        fetchAll: fetchAll,
        fetchOne: fetchOne,
        create: create,
        update: update,
        destroy: destroy,
        upload: upload,
        deleteFile: deleteFile,

        pushInState: pushInState
      }

      var funx, key
      if (localConfig && localConfig.client) {
        funx = localConfig.client(name, plural, store, ApiClient)
        for(key in funx) {
          functions[key] = funx[key]
        }
      }

      if (name === "user") {
        funx = UserClient(store, ApiClient)
        for(key in funx) {
          functions[key] = funx[key]
        }
      }

      return functions

    }()})(name, plural, store, ApiClient)
}

module.exports = function(config, store) {

  const ApiClient = _ApiClient(store)

  var coreClients = {
    ApiClient: ApiClient
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

    coreClients[capitalizeFirstLetter(clientName) + "Client"] = createClient(clientName, plural, store, ApiClient, localConfig)
  }

  if (!coreClients["UserClient"]) {
    coreClients["UserClient"] = createClient("user", "users", store, ApiClient)
  }
  if (!coreClients["PageClient"]) {
    coreClients["PageClient"] = createClient("page", "pages", store, ApiClient)
  }


  return coreClients
}

