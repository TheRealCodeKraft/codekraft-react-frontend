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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (config) {

  config.offline = manageOffline(config.offline);
  config.dashboard = manageDashboard(config.dashboard);
  config.admin = manageAdmin(config.admin);

  return config;
};

function manageOffline(config) {
  var rootFound = false,
      rootElem;
  var loginFound = false,
      loginElem;
  var signupFound = false,
      signupElem;

  for (var key in config.menu) {

    if (!rootFound) {
      rootElem = config.menu[key].items.filter(function (item) {
        return item.root === true;
      })[0];
      if (rootElem) {
        rootFound = true;
        if (!rootElem.component) {
          rootElem.component = _home2.default;
        }
      }
    }

    if (!loginFound) {
      loginElem = config.menu[key].items.filter(function (item) {
        return item.route === "login";
      })[0];
      if (loginElem) {
        loginFound = true;
        if (!loginElem.component) {
          loginElem.component = _login2.default;
        }
      }
    }

    if (!signupFound) {
      signupElem = config.menu[key].items.filter(function (item) {
        return item.route === "signup";
      })[0];
      if (signupElem) {
        signupFound = true;
        if (!signupElem.component) {
          signupElem.component = _signup2.default;
        }
      }
    }

    if (rootFound && loginFound && signupFound) break;
  }

  var newItems = [];
  if (!rootFound) {
    newItems.push({
      title: "Accueilb",
      root: true,
      faIcon: "home",
      component: _home2.default,
      discardOnLogin: true
    });
  }

  if (!loginFound) {
    newItems.push({
      title: "Connexion",
      route: "login",
      faIcon: "user",
      component: _login2.default,
      discardOnLogin: true

    });
  }

  if (!signupFound) {
    newItems.push({
      title: "Inscription",
      route: "signup",
      faIcon: "user-plus",
      component: _signup2.default,
      discardOnLogin: true

    });
  }

  if (newItems.length > 0) {
    config.menu = insertFirst("default", { items: newItems }, config.menu);
  }

  return config;
}

function manageDashboard(config) {
  var rootFound = false,
      rootElem;
  var logoutFound = false,
      logoutElem;
  var adminFound = false,
      adminElem;

  for (var key in config.menu) {

    if (!rootFound) {
      rootElem = config.menu[key].items.filter(function (item) {
        return item.root === true;
      })[0];
      if (rootElem) {
        rootFound = true;
        if (!rootElem.component) {
          rootElem.component = _home4.default;
        }
      }
    }

    if (!logoutFound) {
      logoutElem = config.menu[key].items.filter(function (item) {
        return item.type === "logout";
      })[0];
      if (logoutElem) {
        logoutFound = true;
      }
    }

    if (!adminFound) {
      adminElem = config.menu[key].items.filter(function (item) {
        return item.switch === "/admin";
      })[0];
      if (adminElem) {
        adminFound = true;
      }
    }

    if (rootFound && logoutFound && adminFound) break;
  }

  var newItems = [];
  if (!rootFound) {
    newItems.push({
      title: "Accueil",
      root: true,
      component: _home4.default
    });
  }

  if (!adminFound) {
    newItems.push({
      title: "Administration",
      switch: "/admin",
      grants: ["admin"]
    });
  }

  if (!logoutFound) {
    newItems.push({
      title: "Se déconnecter",
      type: "logout"
    });
  }

  if (newItems.length > 0) {
    config.menu = insertFirst("default", { items: newItems }, config.menu);
  }

  return config;
}

function manageAdmin(config) {
  var rootFound = false,
      rootElem;
  var logoutFound = false,
      logoutElem;
  var backFound = false,
      backElem;

  for (var key in config.menu) {

    if (!rootFound) {
      rootElem = config.menu[key].items.filter(function (item) {
        return item.root === true;
      })[0];
      if (rootElem) {
        rootFound = true;
        if (!rootElem.component) {
          rootElem.component = _home6.default;
        }
      }
    }

    if (!logoutFound) {
      logoutElem = config.menu[key].items.filter(function (item) {
        return item.type === "logout";
      })[0];
      if (logoutElem) {
        logoutFound = true;
      }
    }

    if (!backFound) {
      backElem = config.menu[key].items.filter(function (item) {
        return item.switch === "/dashboard";
      })[0];
      if (backElem) {
        backFound = true;
      }
    }

    if (rootFound && logoutFound && backFound) break;
  }

  var newItems = [];
  if (!rootFound) {
    newItems.push({
      title: "Tableau de bord",
      root: true,
      component: _home6.default,
      hiddenOnHome: true
    });
  }

  if (!backFound) {
    newItems.push({
      title: "Retour au site",
      hiddenOnHome: true,
      switch: "/dashboard"
    });
  }

  if (!logoutFound) {
    newItems.push({
      title: "Se déconnecter",
      hiddenOnHome: true,
      type: "logout"
    });
  }

  if (newItems.length > 0) {
    config.menu = insertFirst("default", { hiddenOnHome: true, items: newItems }, config.menu);
  }

  return config;
}

function insertFirst(key, item, object) {
  var result = {};
  result[key] = item;
  for (var i in object) {
    result[i] = object[i];
  }
  return result;
}