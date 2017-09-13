var React = require("react")
import { connect } from 'react-redux'

import {Switch, Route} from "react-router"

import AuthChecker from './utils/auth-checker'

import Header from './common/header'
import Home from './dashboard/home'

class Dashboard extends React.Component {

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

    var groups = this.props.navigation.dashboard.menu
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
          <Header menu={this.props.navigation.dashboard.menu} 
                  root="/dashboard" />
          {this.state.me && this.state.me.firstname === null
           ? <span>Profile filler</span>
           : <Switch>
               {this.state.pages.map(item => {
                 if (item.component) {
                   var route = "/dashboard" + ((item.route && item.route !== "") ? ("/" + item.route) : "")
                   return <Route exact path={route} component={AuthChecker(item.component)} />
                 } else {
                   return null
                 }
               })}
             </Switch>}
        </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {},
    navigation: state.bootstrap.navigation || {dashboard: {items: []}}
  }
}

export default connect(mapStateToProps)(Dashboard)
