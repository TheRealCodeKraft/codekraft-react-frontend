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

function manageOffline(config) {
  var rootFound = false, rootElem
  var loginFound = false, loginElem
  var signupFound = false, signupElem

  for (var key in config.menu) { 

    if (!rootFound) {
      rootElem = config.menu[key].items.filter(item => { return item.root === true })[0]
      if (rootElem) {
        rootFound=true
        if (!rootElem.component) {
          rootElem.component = OfflineHome
        }
      }
    }

    if (!loginFound) {
      loginElem = config.menu[key].items.filter(item => { return item.route === "login"})[0]
      if (loginElem) {
        loginFound = true
        if (!loginElem.component) {
          loginElem.component = Login
        }
      }
    }

    if (!signupFound) {
      signupElem = config.menu[key].items.filter(item => { return item.route === "signup" })[0]
      if (signupElem) {
        signupFound = true
        if (!signupElem.component) {
          signupElem.component = Signup
        }
      }
    }

    if (rootFound && loginFound && signupFound) break;
  }

  var newItems = []
  if (!rootFound) {
    newItems.push(
      {
        title: "Accueilb",
        root: true,
        faIcon: "home",
        component: OfflineHome,
        discardOnLogin: true
      }
    )
  }

  if (!loginFound) {
    newItems.push(
      {
        title: "Connexion",
        route: "login",
        faIcon: "user",
        component: Login,
        discardOnLogin: true

      }
    )
  }

  if (!signupFound) {
    newItems.push(
      {
        title: "Inscription",
        route: "signup",
        faIcon: "user-plus",
        component: Signup,
        discardOnLogin: true

      }
    )
  }

  if (newItems.length > 0) {
    config.menu = insertFirst("default", {items: newItems}, config.menu) 
  }

  return config
}

function manageDashboard(config) {
  var rootFound = false, rootElem
  var logoutFound = false, logoutElem
  var adminFound = false, adminElem

  for (var key in config.menu) { 

    if (!rootFound) {
      rootElem = config.menu[key].items.filter(item => { return item.root === true })[0]
      if (rootElem) {
        rootFound=true
        if (!rootElem.component) {
          rootElem.component = DashboardHome
        }
      }
    }

    if (!logoutFound) {
      logoutElem = config.menu[key].items.filter(item => { return item.type === "logout"})[0]
      if (logoutElem) {
        logoutFound = true
      }
    }

    if (!adminFound) {
      adminElem = config.menu[key].items.filter(item => { return item.switch === "/admin" })[0]
      if (adminElem) {
        adminFound = true
      }
    }

    if (rootFound && logoutFound && adminFound) break;
  }

  var newItems = []
  if (!rootFound) {
    newItems.push(
      {
        title: "Accueil",
        root: true,
        component: DashboardHome
      }
    )
  }

  if (!adminFound) {
    newItems.push({ 
      title: "Administration",
      switch: "/admin",
      grants: ["admin"]
    })
  }

  if (!logoutFound) {
    newItems.push({
      title: "Se déconnecter",
      type: "logout"
    })
  }

  if (newItems.length > 0) {
    config.menu = insertFirst("default", {items: newItems}, config.menu) 
  }

  return config
}

function manageAdmin(config) {
  var rootFound = false, rootElem
  var logoutFound = false, logoutElem
  var backFound = false, backElem

  for (var key in config.menu) { 

    if (!rootFound) {
      rootElem = config.menu[key].items.filter(item => { return item.root === true })[0]
      if (rootElem) {
        rootFound=true
        if (!rootElem.component) {
          rootElem.component = AdminHome
        }
      }
    }

    if (!logoutFound) {
      logoutElem = config.menu[key].items.filter(item => { return item.type === "logout"})[0]
      if (logoutElem) {
        logoutFound = true
      }
    }

    if (!backFound) {
      backElem = config.menu[key].items.filter(item => { return item.switch === "/dashboard" })[0]
      if (backElem) {
        backFound = true
      }
    }

    if (rootFound && logoutFound && backFound) break;
  }

  var newItems = []
  if (!rootFound) {
    newItems.push(
      {
        title: "Tableau de bord",
        root: true,
        component: AdminHome,
        hiddenOnHome: true,
      }
    )
  }

  if (!backFound) {
    newItems.push({ 
      title: "Retour au site",
      hiddenOnHome: true,
      switch: "/dashboard"
    })
  }

  if (!logoutFound) {
    newItems.push({
      title: "Se déconnecter",
      hiddenOnHome: true,
      type: "logout"
    })
  }

  if (newItems.length > 0) {
    config.menu = insertFirst("default", {hiddenOnHome: true, items: newItems}, config.menu) 
  }


  return config
}

function insertFirst(key, item, object) {
  var result = {}
  result[key] = item
  for(var i in object) {
    result[i] = object[i]
  }
  return result
}
