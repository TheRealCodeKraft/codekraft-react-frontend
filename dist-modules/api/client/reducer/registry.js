'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function ReducerRegistry() {
    var initialReducers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ReducerRegistry);

    this._reducers = _extends({}, initialReducers);
    this._emitChange = null;
  }

  _createClass(ReducerRegistry, [{
    key: 'register',
    value: function register(newReducers) {
      this._reducers = _extends({}, this._reducers, newReducers);
      if (this._emitChange != null) {
        this._emitChange(this.getReducers());
      }
    }
  }, {
    key: 'getReducers',
    value: function getReducers() {
      return _extends({}, this._reducers);
    }
  }, {
    key: 'setChangeListener',
    value: function setChangeListener(listener) {
      if (this._emitChange != null) {
        throw new Error('Can only set the listener for a ReducerRegistry once.');
      }
      this._emitChange = listener;
    }
  }]);

  return ReducerRegistry;
}();