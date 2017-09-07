"use strict";

var _authReducer = function _authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case "TOKEN":
      return Object.assign({}, state, { token: action.token });
    default:
      break;
  }
  return state;
};

// The User Reducer
var _userReducer = function _userReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments[1];

  switch (action.type) {
    case "USERS":
      return Object.assign({}, state, { users: action.users });
    case 'RESET_ME':
      return Object.assign({}, state, { me: null, authenticated: false, notFound: false });
    case 'ME':
      return Object.assign({}, state, { me: action.user, authenticated: true, notFound: false });
    case 'USER_NOT_FOUND':
      return Object.assign({}, state, { me: null, authenticated: false, notFound: true });
    default:
      break;
  }
  return state;
};

exports.authReducer = _authReducer;
exports.userReducer = _userReducer;