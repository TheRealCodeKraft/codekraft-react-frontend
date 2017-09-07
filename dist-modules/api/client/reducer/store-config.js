'use strict';

var _redux = require('redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reducersConfig = require('./reducers-config');

var _reducersConfig2 = _interopRequireDefault(_reducersConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_reduxThunk2.default);
var createStoreWithMiddleware = (0, _redux.applyMiddleware)(_reduxThunk2.default)(_redux.createStore);

module.exports = function configureStore(reducerRegistry) {
  var rootReducer = (0, _reducersConfig2.default)(reducerRegistry.getReducers());
  var store = createStoreWithMiddleware(rootReducer);

  // Reconfigure the store's reducer when the reducer registry is changed - we
  // depend on this for loading reducers via code splitting and for hot
  // reloading reducer modules.
  reducerRegistry.setChangeListener(function (reducers) {
    store.replaceReducer((0, _reducersConfig2.default)(reducers));
  });

  return store;
};