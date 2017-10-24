import IStorage from "./i-storage";

/**
 * LocalStorage implementation of IStorage interface
 */
var LocalStorage = function() {
	IStorage.call(this);
};

LocalStorage.prototype = Object.create(IStorage.prototype);
LocalStorage.prototype.constructor = LocalStorage;

LocalStorage.prototype.set = function(key, value) {
    localStorage.setItem(key, value);
};

LocalStorage.prototype.get = function(key, defaultValue) {
    var found = localStorage.getItem(key);
    if(found)
        return found;

    return defaultValue;
};

LocalStorage.prototype.delete = function(key) {
    localStorage.removeItem(key);
};

export default LocalStorage;
