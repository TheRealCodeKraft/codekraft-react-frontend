'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _require = require('redux'),
    combineReducers = _require.combineReducers;
// Import core third-party reducers here, e.g.:
// var {reducer: formReducer} = require('redux-form')

module.exports = function configureReducers(reducers) {
  return combineReducers(_extends({}, reducers)
  // Combine core third-party reducers here, e.g.:
  // form: formReducer
  );
};