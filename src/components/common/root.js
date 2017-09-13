var React = require("react")
import { connect } from 'react-redux'

import {Switch, Route} from "react-router"

import AuthChecker from '../utils/auth-checker'
import CheckForAcls from '../utils/check-for-acls'

import Header from './header'

import ProfileFiller from '../common/profile-filler'
import AdminPage from '../admin/utils/admin-page'

export default function(config) {

  class Root extends React.Component {

    constructor(props) {
      super(props)
      this.state = {}
    }

    componentWillMount() {
      var self = this
      this.props.clients.UserClient.me(function(me) {
        if (!me.error) {
          self.setState({me: me})
        }
      })

      var groups = config.menu
      var pages = [], pageIndex=0
      for (var index in groups) {
        for (var pIndex in groups[index].items) {
          pages.push(groups[index].items[pIndex])
          if (!(pages[pageIndex].client instanceof Object)) {
            pages[pageIndex].client = this.props.clients[pages[pageIndex].client]
          }
          pageIndex++
        }
      }
      this.setState({pages: pages})

    }

    render() {

      return (
          <div className="dashboard">
            {config.header
             ? <config.header />
             : <Header menu={config.menu} 
                       root={config.root} />
            }
            <section className={"content"}>
            {this.state.me && this.state.me.temp
             ? this.buildProfileFiller()
             : <Switch>
                 {this.state.pages.map(item => {
                   var url = config.root + ((item.route && item.route !== "") ? ((config.root !== "/" ? "/" : "") + item.route) : "")
                   var component = null
                   if (item.component) {
                     component = item.component
                   } else if (item.client) {
                     component = AdminPage(item)
                   }

console.dir(component)
                   if (component) {

                     if (config.grants) {
                       component = CheckForAcls(config.grants, component)
                     }

                     if (config.restricted && !item.discardOnLogin) {
                       component = AuthChecker(component)
                     }

                     if (item.discardOnLogin) {
                       component = AuthChecker(component, true)
                     }

                     return <Route key={url} exact path={url} component={component} />

                   } else {
                     return null
                   }
                 })}
               </Switch>}
            </section>
          </div>
      );
    }

    buildProfileFiller() {
      var Component = config.profileFiller
      if (Component) {
        return <Component />
      } else {
        return <ProfileFiller />
      }
    }
  }

  return connect(mapStateToProps)(Root)

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {},
    navigation: state.bootstrap.navigation || {dashboard: {items: []}}
  }
}
