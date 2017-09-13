'use strict';

var _baseReducers = require('./base-reducers');

var _require = require('react-redux'),
    Provider = _require.Provider;

var _require2 = require('react-dom'),
    render = _require2.render;

var _require3 = require('react-router'),
    Router = _require3.Router;

var configureStore = require('./store-config');
var ReducerRegistry = require('./registry');

function pushNewEntityToState(entity, state, name) {
  var list = state[name];
  if (entity !== undefined) {
    list = JSON.parse(JSON.stringify(list));
    list.push(entity);
  }
  return list;
}

function removeEntityFromState(id, state, name) {
  var list = state[name],
      newList = [];
  if (list && id !== undefined) {
    for (var index in list) {
      if (list[index].id.toString() !== id.toString()) {
        newList.push(list[index]);
      }
    }
  } else {
    newList = list;
  }
  return newList;
}

function mergeEntityAndState(entity, state, name) {
  var list = state[name],
      newList = [];
  if (list && entity !== undefined) {
    for (var index in list) {
      if (list[index].id === entity.id) {
        newList.push(entity);
      } else {
        newList.push(list[index]);
      }
    }
  } else {
    newList = list;
  }
  return newList;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = function createStore(config) {
  var coreReducers = {
    "bootstrap": _baseReducers.bootstrapReducer,
    "authState": _baseReducers.authReducer,
    "userState": _baseReducers.userReducer
  };
  var reducerName, plural;
  for (var index in config) {

    if (config[index] instanceof Object) {
      reducerName = config[index].name;
      plural = config[index].plural ? config[index].plural : reducerName + "s";
    } else {
      reducerName = config[index];
      plural = reducerName + "s";
    }

    coreReducers[reducerName + "State"] = function (reducerName, plural) {
      return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];

        var items;
        var newState = {};
        var _plural = plural;
        switch (action.type) {
          case plural.toUpperCase():
            newState[plural] = action[plural];
            break;
          case reducerName.toUpperCase():
            newState[reducerName] = action[reducerName];
            break;
          case "NEW_" + reducerName.toUpperCase():
            items = pushNewEntityToState(action[reducerName], state, plural);
            newState[plural] = items;
            newState["new" + capitalizeFirstLetter(reducerName)] = action[reducerName];
            break;
          case "UPDATE_" + reducerName.toUpperCase():
            items = mergeEntityAndState(action[reducerName], state, plural);
            newState[plural] = items;
            newState[reducerName] = action[reducerName];
            newState["updated" + capitalizeFirstLetter(reducerName)] = action[reducerName];
            break;
          case "DESTROY_" + reducerName.toUpperCase():
            var deletedItem = state[plural].filter(function (item) {
              return item.id === action.id;
            })[0];
            items = removeEntityFromState(action.id, state, plural);
            newState[plural] = items;
            newState["deleted" + capitalizeFirstLetter(reducerName)] = deletedItem;
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
    }(reducerName, plural);
  }

  var reducerRegistry = new ReducerRegistry(coreReducers);

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

  var store = configureStore(reducerRegistry);
  return store;
};