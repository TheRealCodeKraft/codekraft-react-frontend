import OfflineHome from '../../components/offline/home'
import DashboardHome from '../../components/dashboard/home'
import AdminHome from '../../components/admin/home'

import Login from '../../components/offline/login'
import Signup from '../../components/offline/signup'
import ForgotPassword from '../../components/offline/forgot-password'
import ResetPassword from '../../components/offline/reset-password'

import _users from './admin/users'

const config = {
  iconSet: "fa fa-icon",
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
            discardOnLogin: true
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
            discardOnLogin: true
          },
          {
            title: "Réinitialisation du mot de passe",
            route: "reset-password",
            component: ResetPassword,
            discardOnLogin: true
          }
        ]
      }
    }
  },
  dashboard: {
    root: "/dashboard",
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
      }
    }
  },
  admin: {
    root: "/admin",
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
          _users
        ]
      }
    }
  }
}

export default config
