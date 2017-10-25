'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _home = require('../../components/offline/home');

var _home2 = _interopRequireDefault(_home);

var _home3 = require('../../components/dashboard/home');

var _home4 = _interopRequireDefault(_home3);

var _home5 = require('../../components/admin/home');

var _home6 = _interopRequireDefault(_home5);

var _login = require('../../components/offline/login');

var _login2 = _interopRequireDefault(_login);

var _signup = require('../../components/offline/signup');

var _signup2 = _interopRequireDefault(_signup);

var _forgotPassword = require('../../components/offline/forgot-password');

var _forgotPassword2 = _interopRequireDefault(_forgotPassword);

var _resetPassword = require('../../components/offline/reset-password');

var _resetPassword2 = _interopRequireDefault(_resetPassword);

var _users2 = require('./admin/users');

var _users3 = _interopRequireDefault(_users2);

var _pages2 = require('./admin/pages');

var _pages3 = _interopRequireDefault(_pages2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = {
  iconSet: "fa fa-icon",
  offline: {
    root: "/",
    menu: {
      default: {
        items: [{
          title: "Accueil",
          root: true,
          faIcon: "home",
          component: _home2.default,
          discardOnLogin: true,
          dynamic: {
            params: {
              uid: "home"
            },
            client: "Page"
          }
        }, {
          title: "Connexion",
          route: "login",
          faIcon: "user",
          component: _login2.default,
          discardOnLogin: true
        }, {
          title: "Inscription",
          route: "signup",
          faIcon: "user-plus",
          component: _signup2.default,
          discardOnLogin: true
        }, {
          title: "Mot de passe oublié",
          route: "forgot-password",
          component: _forgotPassword2.default,
          display: false,
          discardOnLogin: true
        }, {
          title: "Réinitialisation du mot de passe",
          route: "reset-password",
          component: _resetPassword2.default,
          display: false,
          discardOnLogin: true
        }]
      },
      side: {
        source: {
          client: "Page",
          group: "SIDE"
        }
      }
    }
  },
  dashboard: {
    root: "/dashboard",
    restricted: true,
    menu: {
      default: {
        items: [{
          title: "Accueil",
          faIcon: "home",
          root: true,
          component: _home4.default
        }, {
          title: "Administration",
          faIcon: "cogs",
          switch: "/admin",
          grants: ["admin"]
        }, {
          title: "Se déconnecter",
          faIcon: "sign-out",
          type: "logout"
        }]
      },
      side: {
        source: {
          client: "Page",
          group: "SIDE"
        }
      }
    }
  },
  admin: {
    root: "/admin",
    restricted: true,
    menu: {
      default: {
        hiddenOnHome: true,
        items: [{
          title: "Tableau de bord",
          faIcon: "home",
          root: true,
          component: _home6.default
        }, {
          title: "Retour au site",
          faIcon: "step-backward",
          switch: "/dashboard"
        }, {
          title: "Se déconnecter",
          faIcon: "sign-out",
          type: "logout"
        }]
      },
      side: {
        items: [_users3.default, _pages3.default]
      }
    }
  }
};

exports.default = config;