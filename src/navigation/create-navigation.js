import OfflineHome from '../components/offline/home'
import DashboardHome from '../components/dashboard/home'
import AdminHome from '../components/admin/home'

import Login from '../components/offline/login'
import Signup from '../components/offline/signup'

import BootstrapConfig from '../config/navigation/default'
import Page from '../components/common/page'

//import sync from 'synchronize'

function loadItems(menu, client, callback) {
  return (function(menu, client) { 
    client.fetchAll({group: menu.source.group}, function(data) {
      var items = data
      for (var key in items) {
        if (items[key].slug) {
          items[key].route = items[key].slug
          items[key].component = Page
        }
      }
      callback(null, items)
    })
  }(menu, client))
}

module.exports = function(config, clients) {

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

//  sync.fiber(function() {
    var menu, submenu, client
    for (var key in config) {
      menu = config[key]
      if (menu instanceof Object) {
        for (var menuKey in menu.menu) {
          submenu = menu.menu[menuKey]
          if (submenu.source) {
            client = clients[submenu.source.client + "Client"]
            loadItems(submenu, client, function() {}/*, sync.defer()*/)
          }
        }
      }
    }
//  })
//sync.await()
console.log("NAVIGATION BUILT")
  return config 
}
