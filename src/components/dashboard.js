import React from "react"
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
               <Route exact path="/dashboard" component={AuthChecker(Home, false, this.props.clients)} />
{/*
               <Route exact path="/dashboard/profile" component={AuthChecker(Profile)} />
               <Route exact path="/dashboard/sessions/:identifier" component={AuthChecker(Playground)} />
               <Route exact path="/dashboard/sessions" component={AuthChecker(Sessions)} />
*/}
             </Switch>}
        </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {}
  }
}

export default connect(mapStateToProps)(Dashboard)
