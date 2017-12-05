'use strict';

var _home = require('../components/offline/home');

var _home2 = _interopRequireDefault(_home);

var _home3 = require('../components/dashboard/home');

var _home4 = _interopRequireDefault(_home3);

var _home5 = require('../components/admin/home');

var _home6 = _interopRequireDefault(_home5);

var _page = require('../components/common/page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import sync from 'synchronize'

//var globalItems = {}

function loadItems(mainKey, subKey, group, client, callback) {
  return function (mainKey, key, group, client) {
    var globalItemsKey = group;
    //if (!globalItems[globalItemsKey]) {
    //  globalItems[globalItemsKey] = []
    client.fetchAll({ group: group }, function (items) {
      for (var key in items) {
        if (items[key].slug) {
          items[key].route = items[key].slug;
          if (items[key].component) item[key].component(items[key]);else items[key].component = (0, _page2.default)(items[key]);
        }
      }
      //globalItems[globalItemsKey] = items
      callback(mainKey, subKey, items);
    }, true);
    //} else {
    //  callback(mainKey, subKey, globalItems[globalItemsKey])
    //}
  }(mainKey, subKey, group, client);
}

function loadItem(mainKey, subKey, itemIndex, baseItem, data, clients, callback) {
  return function (mainKey, subKey, itemIndex, baseItem, data, clients, callback) {
    var client = clients[data.client + "Client"];
    client.fetchAll(data.params, function (data) {
      var item = data[0];
      for (var key in item) {
        baseItem[key] = item[key];
      }
      item = baseItem;
      item.component = (0, _page2.default)(item);

      callback(mainKey, subKey, itemIndex, item);
    }, true);
  }(mainKey, subKey, itemIndex, baseItem, data, clients, callback);
}

module.exports = function (BootstrapConfig, config, clients, callback) {
  var lastIndex;
  for (var key in BootstrapConfig) {
    if (!config[key]) config[key] = BootstrapConfig[key];else {
      if (!config[key].root) config[key].root = BootstrapConfig[key].root;
      if (!config[key].restricted && BootstrapConfig[key].restricted) config[key].restricted = BootstrapConfig[key].restricted;
      if (config[key].enableDefault !== false) {
        if (!config[key].menu) config[key].menu = BootstrapConfig[key].menu;else {
          for (var menuKey in BootstrapConfig[key].menu) {
            if (!config[key].menu[menuKey]) config[key].menu[menuKey] = BootstrapConfig[key].menu[menuKey];else {
              if (!config[key].menu[menuKey].items) config[key].menu[menuKey].items = [];
              for (var itemKey in BootstrapConfig[key].menu[menuKey].items) {
                if (BootstrapConfig[key].menu[menuKey].items[itemKey].root) {
                  if (config[key].menu[menuKey].items.filter(function (item) {
                    return item.root;
                  }).length > 0) {
                    continue;
                  }
                }
                if (BootstrapConfig[key].menu[menuKey].items[itemKey].route !== undefined && config[key].menu[menuKey].items.filter(function (item) {
                  return item.route == BootstrapConfig[key].menu[menuKey].items[itemKey].route;
                }).length > 0) {
                  continue;
                }
                config[key].menu[menuKey].items.push(BootstrapConfig[key].menu[menuKey].items[itemKey]);
                lastIndex = config[key].menu[menuKey].items.length - 1;
                if (config[key].menu[menuKey].discards && config[key].menu[menuKey].discards.indexOf(config[key].menu[menuKey].items[lastIndex].title) !== -1) {
                  config[key].menu[menuKey].items[lastIndex].display = false;
                }
              }
            }
          }
        }
      }
    }
  }

  var menu,
      submenu,
      client,
      listCounter = 0,
      itemCounter = 0,
      dynamic;
  for (var key in config) {
    menu = config[key];
    if (menu instanceof Object) {
      for (var menuKey in menu.menu) {
        submenu = menu.menu[menuKey];
        if (submenu.source) {
          client = clients[submenu.source.client + "Client"];
          listCounter++;
          loadItems(key, menuKey, submenu.source.group, client, function (mainKey, subKey, items) {
            config[mainKey].menu[subKey].items = items;
            listCounter--;
            if (listCounter === 0 && itemCounter === 0) callback(config);
          });
        } else if (submenu.items) {
          for (var itemIndex in submenu.items) {
            dynamic = submenu.items[itemIndex].dynamic;
            if (dynamic) {
              itemCounter++;
              loadItem(key, menuKey, itemIndex, submenu.items[itemIndex], dynamic, clients, function (mainKey, subKey, itemIndex, item) {
                config[mainKey].menu[subKey].items[itemIndex] = item;
                itemCounter--;
                if (listCounter === 0 && itemCounter === 0) callback(config);
              });
            }
          }
        }
      }
    }
  }
  return;
};