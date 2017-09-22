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

var _users2 = require('./admin/users');

var _users3 = _interopRequireDefault(_users2);

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
          discardOnLogin: true
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
        }]
      }
    }
  },
  dashboard: {
    root: "/dashboard",
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
      }
    }
  },
  admin: {
    root: "/admin",
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
        items: [_users3.default]
      }
    }
  }
};

exports.default = config;