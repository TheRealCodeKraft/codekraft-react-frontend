"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var UserClient = function UserClient(store, ApiClient) {

  var name = "user",
      plural = "users";

  var fetchAll = function fetchAll(params, callback) {
    ApiClient.get("users", params, function (data) {
      store.dispatch({
        type: "USERS",
        users: data
      });
      if (callback) callback(data);
    });
  };

  var signup = function signup(params, callback) {
    ApiClient.post("users", params, callback, true);
    ApiClient.post("users", params, function (data) {
      store.dispatch({
        type: "SIGNUP",
        user: data
      });
      if (callback) callback(data);
    }, true);
  };

  var me = function me(callback) {
    if (ApiClient.checkForToken()) {
      ApiClient.get("users/me", {}, function (data) {
        if (data.error) {
          if (callback) callback(data);
        } else {
          store.dispatch({
            type: "ME",
            user: data
          });
          if (callback) callback(data);
        }
      });
    } else {
      callback({ error: "Unable to find some token" });
    }
  };

  var resetMe = function resetMe(callback) {
    store.dispatch({
      type: "RESET_ME"
    });
  };

  var update = function update(id, params, callback) {
    ApiClient.put("users", id, params, function (data) {
      if (!data.error) {
        store.dispatch({
          type: "ME",
          user: data
        });
      }
      if (callback) callback(data);
    });
  };

  var updatePassword = function updatePassword(id, params, callback) {
    ApiClient.put("users/password", id, params, callback);
  };

  return {
    name: name,
    plural: plural,
    fetchAll: fetchAll,
    signup: signup,
    me: me,
    resetMe: resetMe,
    update: update,
    updatePassword: updatePassword
  };
};

exports.default = UserClient;