var React = require("react")
import { connect } from 'react-redux'

import {Switch, Route} from "react-router"

import AuthChecker from '../utils/auth-checker'
import CheckForAcls from '../utils/check-for-acls'

import Header from './header'

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
            <Header menu={config.menu} 
                    root={config.root} />
            <section className="content">
            {this.state.me && this.state.me.firstname === null
             ? <span>Profile filler</span>
             : <Switch>
                 {this.state.pages.map(item => {
                   var url = config.root + ((item.route && item.route !== "") ? ("/" + item.route) : "")
                   var component = null
                   if (item.component) {
                     component = item.component
                   } else if (item.client) {
                     component = AdminPage(item)
                   }

                   if (component) {

                     if (config.grants) {
                       component = CheckForAcls(config.grants, component)
                     }

                     if (config.restricted) {
                       component = AuthChecker(component)
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
  }

  return connect(mapStateToProps)(Root)

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {},
    navigation: state.bootstrap.navigation || {dashboard: {items: []}}
  }
}

