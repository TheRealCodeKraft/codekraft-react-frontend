"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * IStorage interface
 */
var IStorage = function IStorage() {};

IStorage.prototype.set = function (key, value) {
    throw new Error("Not implemented");
};

IStorage.prototype.get = function (key, defaultValue) {
    throw new Error("Not implemented");
};

IStorage.prototype.delete = function (key, defaultValue) {
    throw new Error("Not implemented");
};

exports.default = IStorage;