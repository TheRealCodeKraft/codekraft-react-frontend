var React = require("react")
import { connect } from 'react-redux'

import {Switch, Route} from "react-router"

import AuthChecker from './utils/auth-checker'

import Header from './dashboard/header'
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
  }

  render() {

    return (
        <div className="dashboard">
          <Header location={this.props.location} history={this.props.history} showAside={true} clients={this.props.clients} />
          {this.state.me && this.state.me.firstname === null
           ? <span>Profile filler</span>
           : <Switch>
               {this.props.navigation.dashboard.items.map(menu => {
                 return menu.items.map(item => {
                   var path = "/dashboard" + ((item.path && item.path !== "") ? ("/" + item.path) : "")
console.log(item.component)
                   return <Route exact path={path} component={AuthChecker(item.component)} />
                 })
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
