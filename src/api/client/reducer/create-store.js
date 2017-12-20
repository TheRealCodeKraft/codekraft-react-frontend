import {bootstrapReducer, authReducer, userReducer} from './base-reducers'
var {Provider} = require('react-redux')
var {render} = require('react-dom')
var {Router} = require('react-router')

var configureStore = require('./store-config')
var ReducerRegistry = require('./registry')

function pushNewEntityToState(entity, state, name) {
  var list = state[name] || []
  if (entity !== undefined) {
    list = JSON.parse(JSON.stringify(list))
    list.push(entity)
  }
  return list
}

function removeEntityFromState(id, state, name) {
  var list = state[name] || [], newList = []
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
  var list = state[name] || [], newList = []
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

function createReducer(reducerName, plural, extension) {
  return (function(reducerName, plural) { return function(state = {}, action) {
      var items
      var newState = {}
      var _plural = plural
      switch(action.type) {
        case plural.toUpperCase():
          newState[plural] = action[plural]
          break
        case reducerName.toUpperCase():
          items = mergeEntityAndState(action[reducerName], state, plural)
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
          if (extension) newState = extension(state, action)
          break
      }

      var keys = Object.keys(state)
      if (keys.length > 0) {
        for(var key in keys) {
          key = keys[key]
          if (newState[key] === undefined) {
            newState[key] = state[key]
          }
        }
      }

      return newState
    }})(reducerName, plural)
}


module.exports = function createStore(config) {
  var coreReducers = {
    "bootstrap": bootstrapReducer,
    "authState": authReducer,
  }
  var reducerName, plural
  for (var index in config) {

    if (config[index] instanceof Object) {
      reducerName = config[index].name
      plural = config[index].plural ? config[index].plural : reducerName + "s"
    } else {
      //.reducerName = toCamel(config[index])
      reducerName = config[index]
      plural = reducerName + "s"
    }

    if (reducerName === "user") {
      coreReducers[reducerName + "State"] = createReducer(reducerName, plural, userReducer)
    } else {
      coreReducers[reducerName + "State"] = createReducer(reducerName, plural)
    }
  }

  if (!coreReducers["userState"]) {
    coreReducers["userState"] = createReducer("user", "users", userReducer)
  }
  if (!coreReducers["pageState"]) {
    coreReducers["pageState"] = createReducer("page", "pages")
  }

  var reducerRegistry = new ReducerRegistry(coreReducers)

  var store = configureStore(reducerRegistry)
  return store
}

function toCamel(data){
  return data.replace(/([-_][a-z])/g, function($1){return $1.toUpperCase().replace(/[-_]/,'');});
}
