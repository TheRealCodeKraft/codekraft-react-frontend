import OfflineHome from '../../components/offline/home'
import DashboardHome from '../../components/dashboard/home'
import AdminHome from '../../components/admin/home'

import Login from '../../components/offline/login'
import Signup from '../../components/offline/signup'
import ForgotPassword from '../../components/offline/forgot-password'
import ResetPassword from '../../components/offline/reset-password'

import MainWrapper from '../../components/common/main-wrapper'

import _users from './admin/users'
import _pages from './admin/pages'

const config = {
  iconSet: "fa fa-icon",
  mainWrapper: MainWrapper,
  offline: {
    root: "/",
    menu: {
      default: {
        items: [
          {
            title: "Accueil",
            root: true,
            faIcon: "home",
            component: OfflineHome,
            discardOnLogin: true,
            dynamic: {
              params: {
                uid: "home",
              },
              client: "Page"
            }
          },
          {
            title: "Connexion",
            route: "login",
            faIcon: "user",
            component: Login,
            discardOnLogin: true
          },
          {
            title: "Inscription",
            route: "signup",
            faIcon: "user-plus",
            component: Signup,
            discardOnLogin: true
          },
          {
            title: "Mot de passe oublié",
            route: "forgot-password",
            component: ForgotPassword,
            display: false,
            discardOnLogin: true
          },
          {
            title: "Réinitialisation du mot de passe",
            route: "reset-password",
            component: ResetPassword,
            display: false,
            discardOnLogin: true
          },
          {
            title: "Dashboard",
            switch: "/dashboard",
            onlyOnLogin: true
          }
        ]
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
        items: [
          {
            title: "Accueil",
            faIcon: "home",
            root: true,
            component: DashboardHome
          },
          {
            title: "Administration",
            faIcon: "cogs",
            switch: "/admin",
            grants: ["admin"]
          },
          { 
            title: "Se déconnecter",
            faIcon: "sign-out",
            type: "logout"
          }
        ]
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
    grants: ["admin"],
    menu: {
      default: {
        hiddenOnHome: true,
        items: [
          {
            title: "Tableau de bord",
            faIcon: "home",
            root: true,
            component: AdminHome,
          },
          {
            title: "Retour au site",
            faIcon: "step-backward",
            switch: "/dashboard"
          },
          {
            title: "Se déconnecter",
            faIcon: "sign-out",
            type: "logout"
          }
        ]
      },
      side: {
        items: [
          _users,
          _pages
        ]
      }
    }
  }
}

export default config
