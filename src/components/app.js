import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { Route, Switch } from 'react-router-dom'

import ActionCableProvider from 'react-actioncable-provider'

import Header from './common/header'
import Root from './common/root'

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
        <Switch>
           <Route path="/dashboard" render={() => <Header menu={this.props.navigation.dashboard.menu} root={this.props.navigation.dashboard.root} custom={this.props.navigation.dashboard.header} />} />
           <Route path="/admin" render={() => <Header menu={this.props.navigation.admin.menu} root={this.props.navigation.admin.root} custom={this.props.navigation.admin.header} />} />
           <Route path="/" render={() => <Header menu={this.props.navigation.offline.menu} root={this.props.navigation.offline.root} custom={this.props.navigation.offline.header} />} />
        </Switch>
 
          {this.props.token
           ? <ActionCableProvider url={process.env.CABLE_URL + "/?token=" + this.props.token.access_token}>
               <Switch>
                 <Route path="/dashboard" component={Root("dashboard", this.props.navigation.dashboard)} />
                 <Route path="/admin" component={Root("admin", this.props.navigation.admin)} />
                 <Route path="/" component={Root("offline", this.props.navigation.offline)} />
               </Switch>
             </ActionCableProvider>
           : <Switch>
               <Route path="/dashboard" component={Root("dashboard", this.props.navigation.dashboard)} />
               <Route path="/admin" component={Root("admin", this.props.navigation.admin)} />
               <Route path="/" component={Root("offline", this.props.navigation.offline)} />
             </Switch>}
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients,
    token: state.authState.token || null,
    navigation: state.bootstrap.navigation
  }
}

export default withRouter(connect(mapStateToProps)(App))
