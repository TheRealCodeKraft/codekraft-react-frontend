
var Logger = require('js-logger')

import StorageService from './storage/storage'
const STORAGE_KEY_FOR_TOKEN = "token";

var ApiClient = function(store) {
  var call = function(method, endpoint, params, callback, offline=false, defaultParams=false) {
    var headers = {
    }

    if (!(params instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }

    if (offline) {
        headers['Authorization'] = 'bearer ' + process.env.APP_TOKEN
    } else {
      if (defaultParams) {
        params['client_id'] = process.env.CLIENT_ID
        params['client_secret'] = process.env.CLIENT_SECRET
        params['grant_type'] = 'password'
      } else {
        var token = JSON.parse(StorageService.get(STORAGE_KEY_FOR_TOKEN)).access_token
        headers['Authorization'] = 'bearer ' + token
      }
    }
    var fetchParams = {
      method: method,
      headers: headers,
    }

    switch(method) {
      case "post":
      case "put":
      case "patch":
        if (!(params instanceof FormData)) {
          fetchParams.body = JSON.stringify(params)
        } else {
          fetchParams.body = params
        }
        break
      case "get":
        if (params !== undefined) {
          var keys = Object.keys(params)
          if (keys.length > 0) {
            for(var paramIndex in keys) {
              endpoint += (paramIndex == 0 ? "?" : "&")
              endpoint += keys[paramIndex] + "=" + params[keys[paramIndex]]
            }
          }
        }
        break
      default:
        break
    }

    Logger.debug({
      method: method,
      request: endpoint,
      headers: headers,
      data: params
    })

    fetch(process.env.API_URL + endpoint, fetchParams)
    .then(promise => {
      promise.json().then(response => {

        /*if (response.json) response = response.json*/

        Logger.debug({
          method: method,
          response: endpoint,
          data: response
        })  

        if (response.error) {
          if (response.error === "The access token expired") {
            refreshToken(callback)
          } else if (response.error === "The access token is invalid") {
            logout(callback)
          } else {
            callback(response)
          }
        } else if (callback) callback(response);
      });
    }).catch(exception => {

      Logger.debug({
        method: method,
        response: endpoint,
        exception: exception
      })  

      if (callback) callback({error: true, message: exception.message});
    });
    return;
  }

  var post = function(endpoint, params, callback, offline=false, defaultParams=false) {
    var ps = new FormData()
    var keys = Object.keys(params), key
    for (var i in keys) {
      key = keys[i]
      if (key == "attachments") {
        for (var j in params[key]) {
          ps.append("attachments[]", params[key][j])
        }
      } else {
        ps.append(key, params[key])
      }
    }
    return call("post", endpoint, ps, callback, offline, defaultParams)
  }

  var get = function(endpoint, params, callback, offline=false) {
    return call("get", endpoint, params, callback, offline)
  }

  var put = function(endpoint, id, params, callback, offline=false) {
    return call("put", endpoint + (id ? ("/" + id) : ""), params, callback, offline)
  }

  var patch = function(endpoint, id, params, callback) {
    return call("patch", endpoint + (id ? ("/" + id) : ""), params, callback)
  }

  var destroy = function(endpoint, id, callback) {
    return call("delete", endpoint + "/" + id, undefined, callback)
  }

  var upload = function(endpoint, fieldName, file, callback) {
    var params = new FormData(); 
    params.append(fieldName, file)
    return call("put", endpoint, params, callback)
  }

  var refreshToken = function(callback) {
    var refresh_token = getToken().refresh_token
    post("oauth/token", { grant_type: "refresh_token", refresh_token: refresh_token}, function(data) {
      if (data.error) {
        if (callback) callback(data)
      } else {
        storeToken(data, callback)
      }
   });
  }

  var logout = function(callback) {
    StorageService.delete(STORAGE_KEY_FOR_TOKEN)
    store.dispatch({
      type: "TOKEN",
      token: null
    })

    store.dispatch({
      type: "USER_NOT_FOUND"
    })
    if (callback) callback()
  }


  var getToken = function() {
    var storageToken = StorageService.get(STORAGE_KEY_FOR_TOKEN)
    var token = null
    if (storageToken) token = JSON.parse(storageToken)

    store.dispatch({
      type: "TOKEN",
      token: token
    })

    return token
  }

  var setToken = function(token) {
    StorageService.set(STORAGE_KEY_FOR_TOKEN, JSON.stringify(token));

    store.dispatch({
      type: "TOKEN",
      token: token
    })
  }

  var storeToken = function(data, callback) {
    setToken(data)
    callback(data)
  }

  var login = function(params, callback) {
    if (checkForToken()) {
      logout(function() {
        login(params, callback)
      })
    } else {
      params["grant_type"] = "password"
      post("oauth/token", params, function(data) {
        if (data.error) {
          if (callback) callback(data)
        } else {
          storeToken(data, callback)
        }
      }, false, true)
    }
  }

  var checkForToken = function() {
    var token = StorageService.get(STORAGE_KEY_FOR_TOKEN)
    if (token) {
      return true
    } else { return false }
  }

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
    login: login,
  }
}

export default ApiClient;
