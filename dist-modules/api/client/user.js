"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var UserClient = function UserClient(store, ApiClient) {

  var signup = function signup(params, callback) {
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

  var forgotPassword = function forgotPassword(params, callback) {
    ApiClient.get("users/forgot-password", params, callback, true);
  };

  var checkStamp = function checkStamp(params, callback) {
    ApiClient.get("users/check-stamp", params, function (data) {
      store.dispatch({
        type: "STAMP",
        stamp: data
      });
      if (callback) callback(data);
    }, true);
  };

  var updatePassword = function updatePassword(id, params, callback) {
    ApiClient.put("users/update-password", id, params, function (data) {
      store.dispatch({
        type: "UPDATE_PASSWORD",
        updated: true
      });
      if (callback) callback(data);
    }, true);
  };

  return {
    signup: signup,
    me: me,
    resetMe: resetMe,
    forgotPassword: forgotPassword,
    checkStamp: checkStamp,
    updatePassword: updatePassword
  };
};

exports.default = UserClient;