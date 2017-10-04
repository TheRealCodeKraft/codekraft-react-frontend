import OfflineHome from '../components/offline/home'
import DashboardHome from '../components/dashboard/home'
import AdminHome from '../components/admin/home'

import Login from '../components/offline/login'
import Signup from '../components/offline/signup'

import BootstrapConfig from '../config/navigation/default'
import Page from '../components/common/page'

//import sync from 'synchronize'

function loadItems(mainKey, subKey, group, client, callback) {
  return (function(mainKey, key, group, client) { 
    client.fetchAll({group: group}, function(data) {
      var items = data
      for (var key in items) {
        if (items[key].slug) {
          items[key].route = items[key].slug
          if (items[key].component) item[key].component(items[key])
          else items[key].component = Page(items[key])
        }
      }
      callback(mainKey, subKey, items)
    }, true)
  }(mainKey, subKey, group, client))
}

module.exports = function(config, clients, callback) {

  for (var key in BootstrapConfig) {
    if (!config[key]) config[key] = BootstrapConfig[key]
    else {
      if (!config[key].root) config[key].root = BootstrapConfig[key].root
      if (!config[key].restricted && BootstrapConfig[key].restricted) config[key].restricted = BootstrapConfig[key].restricted
      if (config[key].enableDefault !== false) {
        if (!config[key].menu) config[key].menu = BootstrapConfig[key].menu
        else {
          for (var menuKey in BootstrapConfig[key].menu) {
            if (!config[key].menu[menuKey]) config[key].menu[menuKey] = BootstrapConfig[key].menu[menuKey]
            else {
              for (var itemKey in BootstrapConfig[key].menu[menuKey].items) {
                config[key].menu[menuKey].items.push(BootstrapConfig[key].menu[menuKey].items[itemKey])
              }
            }
          }
        }
      }
    }
  }

  var menu, submenu, client, counter=0
  for (var key in config) {
    menu = config[key]
    if (menu instanceof Object) {
      for (var menuKey in menu.menu) {
        submenu = menu.menu[menuKey]
        if (submenu.source) {
          client = clients[submenu.source.client + "Client"]
          counter++
          loadItems(key, menuKey, submenu.source.group, client, function(mainKey, subKey, items) {
            config[mainKey].menu[subKey].items = items
            counter--
            if (counter === 0)
              callback(config)
          })
        }
      }
    }
  }
  return;
}
