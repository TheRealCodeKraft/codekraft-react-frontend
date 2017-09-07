import {authReducer, userReducer} from './base-reducers'
var {Provider} = require('react-redux')
var {render} = require('react-dom')
var {Router} = require('react-router')

var configureStore = require('./store-config')
//var coreReducers = require('./ducks/core')
var ReducerRegistry = require('./registry')

function pushNewEntityToState(entity, state, name) {
  var list = state[name]
  if (entity !== undefined) {
    list = JSON.parse(JSON.stringify(list))
    list.push(entity)
  }
  return list
}

function removeEntityFromState(id, state, name) {
  var list = state[name], newList = []
  if (list && id !== undefined) {
    for(var index in list) {
      if (list[index].id.toString() !== id.toString()) {
        newList.push(list[index])
      }
    }
  } else {
    newList = list
  }
  return newList
}

function mergeEntityAndState(entity, state, name) {
  var list = state[name], newList = []
  if (list && entity !== undefined) {
    for(var index in list) {
      if (list[index].id === entity.id) {
        newList.push(entity)
      } else {
        newList.push(list[index])
      }
    }
  } else {
    newList = list
  }
  return newList
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function createStore(config) {
  var coreReducers = {
    "authState": authReducer,
    "userState": userReducer
  }
  var reducerName, plural
  for (var index in config) {

    if (config[index] instanceof Object) {
      reducerName = config[index].singular
      plural = config[index].plural
    } else {
      reducerName = config[index]
      plural = reducerName + "s"
    }

    coreReducers[reducerName + "State"] = (function(reducerName, plural) { return function(state = {}, action) {
      var items
      var newState = {}
      var _plural = plural
      switch(action.type) {
        case plural.toUpperCase():
          newState[plural] = action[plural]
          break
        case reducerName.toUpperCase():
          newState[reducerName] = action[reducerName]
          break
        case "NEW_" + reducerName.toUpperCase():
          items = pushNewEntityToState(action[reducerName], state, plural)
          newState[plural] = items
          newState["new" + capitalizeFirstLetter(reducerName)] = action[reducerName]
          break
        case "UPDATE_" + reducerName.toUpperCase():
          items = mergeEntityAndState(action[reducerName], state, plural)
          newState[plural] = items
          newState[reducerName] = action[reducerName]
          newState["updated" + capitalizeFirstLetter(reducerName)] = action[reducerName]
          break
        case "DESTROY_" + reducerName.toUpperCase():
          var deletedItem = state[plural].filter(item => { return item.id === action.id })[0]
          items = removeEntityFromState(action.id, state, plural)
          newState[plural] = items
          newState["deleted" + capitalizeFirstLetter(reducerName)] = deletedItem
          break
        default:
          break
      }

      return Object.assign({}, state, newState)
    }})(reducerName, plural)
  }

  var reducerRegistry = new ReducerRegistry(coreReducers)

  // Configure hot module replacement for core reducers
  if (process.env.NODE_ENV !== 'production') {
/*
    if (module.hot) {
      module.hot.accept('./ducks/core', () => {
        var nextCoreReducers = require('./ducks/core')
        reducerRegistry.register(nextCoreReducers)
      })
    }
*/
  }

  var store = configureStore(reducerRegistry)
  return store
}
