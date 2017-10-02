var UserClient = function(store, ApiClient) {

  var signup = function(params, callback) {
    ApiClient.post("users", params, function(data) {
      store.dispatch({
        type: "SIGNUP",
        user: data
      })
      if (callback) callback(data)
    }, true)

  }

  var me = function(callback) {
    if (ApiClient.checkForToken()) {
      ApiClient.get("users/me", {}, function(data) {
        if (data.error) {
          if (callback) callback(data)
        } else {
          store.dispatch({
            type: "ME",
            user: data
          })
          if (callback) callback(data)
        }
      })
    } else {
      callback({error: "Unable to find some token"})
    }
  }

  var resetMe = function(callback) {
    store.dispatch({
      type: "RESET_ME"
    })
  }

  var forgotPassword = function(params, callback) {
    ApiClient.get("users/forgot-password", params, callback, true)
  }

  var checkStamp = function(params, callback) {
    ApiClient.get("users/check-stamp", params, function(data) {
      store.dispatch({
        type: "STAMP", 
        stamp: data
      }) 
      if (callback) callback(data)
    }, true)
  }

  var updatePassword = function(id, params, callback) {
    ApiClient.put("users/update-password", id, params, function(data) {
      store.dispatch({
        type: "UPDATE_PASSWORD",
        updated: true
      })
      if (callback) callback(data)
    }, true)
  }

  return {
    signup: signup,
    me: me,
    resetMe: resetMe,
    forgotPassword: forgotPassword,
    checkStamp: checkStamp,
    updatePassword: updatePassword
  }

}

export default UserClient;
