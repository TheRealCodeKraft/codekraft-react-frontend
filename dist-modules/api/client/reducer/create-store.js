'use strict';

var _require = require('react-redux'),
    Provider = _require.Provider;

var _require2 = require('react-dom'),
    render = _require2.render;

var _require3 = require('react-router'),
    Router = _require3.Router;

var configureStore = require('./store-config');
//var coreReducers = require('./ducks/core')
var ReducerRegistry = require('./registry');

module.exports = function createStore(coreReducers) {
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