import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { Route, Switch } from 'react-router-dom'

import ActionCableProvider from 'react-actioncable-provider'

import Offline from './offline'
import Root from './common/root'
import Dashboard from './dashboard'
import Admin from './admin'

/**
 * OBL Main App Container
 **/
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null
    }
  }

  componentWillMount() {
    this.props.clients.ApiClient.getToken()
  }

  componentWillReceiveProps(props) {
    if (props.location.pathname === '/logout' || this.props.location.pathname === '/logout') {
      var self = this
      this.props.clients.ApiClient.logout(function(data) {
        self.props.history.push("/")
      })
    }
  }

  render() {

    return (
        <div id="main-container" className={"wrapper"}>
          {this.props.token
           ? <ActionCableProvider url={process.env.CABLE_URL + "/?token=" + this.props.token.access_token}>
               <Switch>
                 <Route path="/dashboard" component={Root(this.props.navigation.dashboard)} />
                 <Route path="/admin" component={Root(this.props.navigation.admin)} />
                 <Route path="/" component={Offline} />
               </Switch>
             </ActionCableProvider>
           : <Switch>
               <Route path="/dashboard" component={Root(this.props.navigation.dashboard)} />
               <Route path="/admin" component={Root(this.props.navigation.admin)} />
               <Route path="/" component={Offline} />
             </Switch>}
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    //me: state.userState.me || null,
    clients: state.bootstrap.clients,
    token: state.authState.token || null,
    navigation: state.bootstrap.navigation
  }
}

export default withRouter(connect(mapStateToProps)(App))
