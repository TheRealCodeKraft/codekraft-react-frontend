import OfflineHome from '../../components/offline/home'
import DashboardHome from '../../components/dashboard/home'
import AdminHome from '../../components/admin/home'

import Login from '../../components/offline/login'
import Signup from '../../components/offline/signup'

const config = {
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
            root: true,
            component: DashboardHome
          },
          {
            title: "Administration",
            switch: "/admin",
            grants: ["admin"]
          },
          { 
            title: "Se déconnecter",
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
        items: [
          {
            title: "Tableau de bord",
            root: true,
            component: AdminHome,
            hiddenOnHome: true,
          },
          {
            title: "Retour au site",
            hiddenOnHome: true,
            switch: "/dashboard"
          },
          {
            title: "Se déconnecter",
            hiddenOnHome: true,
            type: "logout"
          }
        ]
      }
    }
  }
}

export default config
