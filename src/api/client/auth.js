import BaseClient from './base'

import store from 'reducers/index';

import StorageService from 'clients/storage/storage'
const STORAGE_KEY_FOR_TOKEN = "token";

//import UserClient from 'clients/user'

var Auth = function() {

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
    BaseClient.post("oauth/token", { grant_type: "refresh_token", refresh_token: refresh_token}, function(data) {
      if (data.error) {
        if (callback) callback(data)
      } else {
        Auth.storeToken(data, callback)
        //UserClient.me()
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
      BaseClient.post("oauth/token", params, function(data) {
        if (data.error) {
          if (callback) callback(data)
        } else {
          Auth.storeToken(data, callback)
        }
      }, false, true)
    }
  }

  var checkForToken = function() {
    var token = StorageService.get(STORAGE_KEY_FOR_TOKEN)
    if (token) {
    /*  
      var currentTimestamp = parseInt(new Date().getTime() / 1000);
      var  expireTimestamp = token.created_at + (token.expires_in / 2);

      if(currentTimestamp >= expireTimestamp) {
        return "toRefresh";
      }
*/
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
}()

export default Auth
