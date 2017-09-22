import OfflineHome from '../components/offline/home'
import DashboardHome from '../components/dashboard/home'
import AdminHome from '../components/admin/home'

import Login from '../components/offline/login'
import Signup from '../components/offline/signup'

import BootstrapConfig from '../config/navigation/default'

module.exports = function(config) {

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

  return config 
}
