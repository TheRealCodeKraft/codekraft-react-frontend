"use strict";

var _bootstrapReducer = function _bootstrapReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  var newState = {};
  switch (action.type) {
    case "CLIENTS":
      newState["clients"] = action.clients;
      break;
    default:
      break;
  }

  var keys = Object.keys(state);
  if (keys.length > 0) {
    //return Object.assign({}, state, newState)
    for (var key in keys) {
      key = keys[key];
      if (newState[key] === undefined) {
        newState[key] = state[key];
      }
    }
  }

  return newState;
};

var _authReducer = function _authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  var newState = {};
  switch (action.type) {
    case "TOKEN":
      newState["token"] = action.token;
      break;
    default:
      break;
  }

  var keys = Object.keys(state);
  if (keys.length > 0) {
    //return Object.assign({}, state, newState)
    for (var key in keys) {
      key = keys[key];
      if (newState[key] === undefined) {
        newState[key] = state[key];
      }
    }
  }

  return newState;
};

// The User Reducer
var _userReducer = function _userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  var newState = {};
  switch (action.type) {
    case "USERS":
      newState["users"] = action.users;
      break;
    case 'RESET_ME':
      newState["me"] = null;
      newState["authenticated"] = false;
      newState["notFound"] = false;
      break;
    case 'ME':
      newState["me"] = action.user;
      newState["authenticated"] = true;
      newState["notFound"] = false;
      break;
    case 'USER_NOT_FOUND':
      newState["me"] = null;
      newState["authenticated"] = false;
      newState["notFound"] = true;
      break;
    default:
      break;
  }

  var keys = Object.keys(state);
  if (keys.length > 0) {
    //return Object.assign({}, state, newState)
    for (var key in keys) {
      key = keys[key];
      if (newState[key] === undefined) {
        newState[key] = state[key];
      }
    }
  }

  return newState;
};

exports.bootstrapReducer = _bootstrapReducer;
exports.authReducer = _authReducer;
exports.userReducer = _userReducer;