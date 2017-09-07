var {Provider} = require('react-redux')
var {render} = require('react-dom')
var {Router} = require('react-router')

var configureStore = require('./store-config')
//var coreReducers = require('./ducks/core')
var ReducerRegistry = require('./registry')

module.exports = function createStore(coreReducers) {
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
