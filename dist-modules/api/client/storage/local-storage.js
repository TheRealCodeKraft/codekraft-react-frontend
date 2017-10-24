"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _iStorage = require("./i-storage");

var _iStorage2 = _interopRequireDefault(_iStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * LocalStorage implementation of IStorage interface
 */
var LocalStorage = function LocalStorage() {
    _iStorage2.default.call(this);
};

LocalStorage.prototype = Object.create(_iStorage2.default.prototype);
LocalStorage.prototype.constructor = LocalStorage;

LocalStorage.prototype.set = function (key, value) {
    localStorage.setItem(key, value);
};

LocalStorage.prototype.get = function (key, defaultValue) {
    var found = localStorage.getItem(key);
    if (found) return found;

    return defaultValue;
};

LocalStorage.prototype.delete = function (key) {
    localStorage.removeItem(key);
};

exports.default = LocalStorage;