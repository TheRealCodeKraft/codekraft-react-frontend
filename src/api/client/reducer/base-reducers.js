const _authReducer = function(state = {}, action) {
  switch(action.type) {
    case "TOKEN":
      return Object.assign({}, state, { token: action.token })
    default:
      break
  }
  return state
}

// The User Reducer
const _userReducer = function(state = {}, action) {
  switch(action.type) {
    case "USERS":
      return Object.assign({}, state, { users: action.users })
    case 'RESET_ME':
      return Object.assign({}, state, { me: null, authenticated: false, notFound: false })
    case 'ME':
      return Object.assign({}, state, { me: action.user, authenticated: true, notFound: false })
    case 'USER_NOT_FOUND':
      return Object.assign({}, state, { me: null, authenticated: false, notFound: true })
    default:
      break
  }
  return state
}

exports.authReducer = _authReducer
exports.userReducer = _userReducer
