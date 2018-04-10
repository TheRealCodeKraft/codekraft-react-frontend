import {bootstrapReducer, authReducer, userReducer} from './base-reducers'
var {Provider} = require('react-redux')
var {render} = require('react-dom')
var {Router} = require('react-router')

var configureStore = require('./store-config')
var ReducerRegistry = require('./registry')

function pushNewEntityToState(entity, state, name, insertOn) {
  var list = state[name] || []
  if (entity !== undefined) {
    list = JSON.parse(JSON.stringify(list))
    if (insertOn == "bottom") {
			if (list.list) { list.list.push(entity) }
      else list.push(entity)
    } else {
			if (list.list) { list.list.unshift(entity) }
      else list.unshift(entity)
    }
  }
  return list
}

function removeEntityFromState(id, state, name) {
  var list = state[name] || [], newList = []
  if (list && id !== undefined) {
		var daList = list.list ? list.list : list
    for(var index in daList) {
      if (daList[index].id.toString() !== id.toString()) {
        newList.push(daList[index])
      }
    }
  } else {
    newList = (list.list ? list.list : list)
  }
  return list.list ? {list: newList, pagination: list.pagination} : newList
}

function mergeEntityAndState(entity, state, name) {
  var list = state[name] || [], newList = []
  if (list && entity !== undefined) {
		var daList = list.list ? list.list : list
    for(var index in daList) {
      if (daList[index].id === entity.id) {
        newList.push(entity)
      } else {
        newList.push(daList[index])
      }
    }
  } else {
    newList = list.list ? list.list : list
  }
  return list.list ? {list: newList, pagination: list.pagination} : newList
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function createReducer(reducerName, plural, extension, insertOn) {
  return (function(reducerName, plural, extension, insertOn) { return function(state = {}, action) {
      var items
      var newState = {}
      var _plural = plural
      switch(action.type) {
        case plural.toUpperCase():
          var list
          if (action.append && state[plural]) {
            list = state[plural].concat(action[plural])
          } else {
            list = action[plural]
          }
          newState[plural] = list 
          break
        case reducerName.toUpperCase():
          items = mergeEntityAndState(action[reducerName], state, plural)
          newState[plural] = items
          newState[reducerName] = action[reducerName]
          break
        case "NEW_" + reducerName.toUpperCase():
          items = pushNewEntityToState(action[reducerName], state, plural, insertOn)
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
          if (state[plural]) {
            var deletedItem = state[plural].filter(item => { return item.id === action.id })[0]
            items = removeEntityFromState(action.id, state, plural)
            newState[plural] = items
            newState["deleted" + capitalizeFirstLetter(reducerName)] = deletedItem
          }
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

      if (extension) {
        newState = extension(newState, action, state)
      }

      return newState
    }})(reducerName, plural, extension, insertOn)
}


module.exports = function createStore(config) {
  var coreReducers = {
    "bootstrap": bootstrapReducer,
    "authState": authReducer,
  }
  var reducerName, plural, extension, insertOn
  for (var index in config) {

    if (config[index] instanceof Object) {
      reducerName = config[index].name
      plural = config[index].plural ? config[index].plural : reducerName + "s"
      extension = config[index].reducer
      insertOn = config[index].insertOn || "bottom"
    } else {
      //.reducerName = toCamel(config[index])
      reducerName = config[index]
      plural = reducerName + "s"
      insertOn = "bottom"
    }

    if (reducerName === "user") {
      coreReducers[reducerName + "State"] = createReducer(reducerName, plural, userReducer)
    } else {
      coreReducers[reducerName + "State"] = createReducer(reducerName, plural, extension, insertOn)
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
