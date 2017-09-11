import {applyMiddleware, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'

import configureReducers from './reducers-config'

var createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore)

module.exports = function configureStore(reducerRegistry) {
  var rootReducer = configureReducers(reducerRegistry.getReducers())
  var store = createStoreWithMiddleware(rootReducer)

  // Reconfigure the store's reducer when the reducer registry is changed - we
  // depend on this for loading reducers via code splitting and for hot
  // reloading reducer modules.
  reducerRegistry.setChangeListener((reducers) => {
    store.replaceReducer(configureReducers(reducers))
  })

  return store
}
