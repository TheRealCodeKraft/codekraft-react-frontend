"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _iStorage = require("./i-storage");

var _iStorage2 = _interopRequireDefault(_iStorage);

var _localStorage = require("./local-storage");

var _localStorage2 = _interopRequireDefault(_localStorage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * StorageService
 * Bridge for storage
 */
var StorageService = function StorageService() {
	_iStorage2.default.call(this);
	this.storage = new _localStorage2.default();
};

StorageService.prototype = Object.create(_iStorage2.default.prototype);
StorageService.prototype.constructor = StorageService;

StorageService.prototype.set = function (key, value) {
	return this.storage.set(key, value);
};

StorageService.prototype.get = function (key, defaultValue) {
	return this.storage.get(key, defaultValue);
};

StorageService.prototype.getParsed = function (key, defaultValue) {
	var value = this.storage.get(key);
	if (value === undefined) {
		return defaultValue;
	}

	return JSON.parse(value);
};

StorageService.prototype.delete = function (key) {
	return this.storage.delete(key);
};

exports.default = new StorageService();