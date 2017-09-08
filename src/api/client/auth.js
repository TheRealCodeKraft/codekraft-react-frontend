import ApiClient from './api-client'

import StorageService from './storage/storage'
const STORAGE_KEY_FOR_TOKEN = "token";

var Auth = function(store) {
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

  var refreshToken = function(callback) {
    var refresh_token = getToken().refresh_token
    ApiClient.post("oauth/token", { grant_type: "refresh_token", refresh_token: refresh_token}, function(data) {
      if (data.error) {
        if (callback) callback(data)
      } else {
        storeToken(data, callback)
      }
   });
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
      ApiClient.post("oauth/token", params, function(data) {
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

  return {
    getToken: getToken,
    refreshToken: refreshToken,
    storeToken: storeToken,
    checkForToken: checkForToken,
    login: login,
    logout: logout
  }
}

export default Auth
