'use strict';

var _home = require('../components/offline/home');

var _home2 = _interopRequireDefault(_home);

var _home3 = require('../components/dashboard/home');

var _home4 = _interopRequireDefault(_home3);

var _home5 = require('../components/admin/home');

var _home6 = _interopRequireDefault(_home5);

var _login = require('../components/offline/login');

var _login2 = _interopRequireDefault(_login);

var _signup = require('../components/offline/signup');

var _signup2 = _interopRequireDefault(_signup);

var _default = require('../config/navigation/default');

var _default2 = _interopRequireDefault(_default);

var _page = require('../components/common/page');

var _page2 = _interopRequireDefault(_page);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import sync from 'synchronize'

function loadItems(menu, client, callback) {
  return function (menu, client) {
    client.fetchAll({ group: menu.source.group }, function (data) {
      var items = data;
      for (var key in items) {
        if (items[key].slug) {
          items[key].route = items[key].slug;
          items[key].component = _page2.default;
        }
      }
      callback(null, items);
    });
  }(menu, client);
}

module.exports = function (config, clients) {

  for (var key in _default2.default) {
    if (!config[key]) config[key] = _default2.default[key];else {
      if (!config[key].root) config[key].root = _default2.default[key].root;
      if (!config[key].restricted && _default2.default[key].restricted) config[key].restricted = _default2.default[key].restricted;
      if (config[key].enableDefault !== false) {
        if (!config[key].menu) config[key].menu = _default2.default[key].menu;else {
          for (var menuKey in _default2.default[key].menu) {
            if (!config[key].menu[menuKey]) config[key].menu[menuKey] = _default2.default[key].menu[menuKey];else {
              for (var itemKey in _default2.default[key].menu[menuKey].items) {
                config[key].menu[menuKey].items.push(_default2.default[key].menu[menuKey].items[itemKey]);
              }
            }
          }
        }
      }
    }
  }

  //  sync.fiber(function() {
  var menu, submenu, client;
  for (var key in config) {
    menu = config[key];
    if (menu instanceof Object) {
      for (var menuKey in menu.menu) {
        submenu = menu.menu[menuKey];
        if (submenu.source) {
          client = clients[submenu.source.client + "Client"];
          loadItems(submenu, client, function () {} /*, sync.defer()*/);
        }
      }
    }
  }
  //  })
  //sync.await()
  console.log("NAVIGATION BUILT");
  return config;
};