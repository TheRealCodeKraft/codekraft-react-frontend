import IStorage from "./i-storage";
import LocalStorage from "./local-storage";

/**
 * StorageService 
 * Bridge for storage
 */
var StorageService = function() {
	IStorage.call(this); 
    this.storage = new LocalStorage();
};

StorageService.prototype = Object.create(IStorage.prototype);
StorageService.prototype.constructor = StorageService;

StorageService.prototype.set = function(key, value) {
    return this.storage.set(key, value);
};

StorageService.prototype.get = function(key, defaultValue) {
    return this.storage.get(key, defaultValue);
};

StorageService.prototype.delete = function(key) {
    return this.storage.delete(key);
};

export default new StorageService();
