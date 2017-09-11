import React from 'react';
import { connect } from 'react-redux'

import { BrowserRouter } from 'react-router-dom'
import { Route, Switch } from 'react-router-dom'

import ActionCableProvider from 'react-actioncable-provider'

import Offline from './offline'
import Dashboard from './dashboard'
/*
import Admin from './admin'
*/

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
    this.props.clients.AuthClient.getToken()
  }

  render() {

    return (
      <BrowserRouter>
        <div id="main-container" className={"wrapper"}>
          {this.props.token
           ? <ActionCableProvider url={process.env.CABLE_URL + "/?token=" + this.props.token.access_token}>
               <Switch>
                 <Route path="/dashboard" component={Dashboard} />
{/*
                 <Route path="/admin" component={Admin} />
*/}
                 <Route path="/" component={Offline} />
               </Switch>
             </ActionCableProvider>
           : <Switch>
               <Route path="/dashboard" component={Dashboard} />
{/*
               <Route path="/admin" component={Admin} />
*/}
               <Route path="/" component={Offline} />
             </Switch>}
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return {
    //me: state.userState.me || null,
    clients: state.bootstrap.clients,
    token: state.authState.token || null
  }
}

export default connect(mapStateToProps)(App);
