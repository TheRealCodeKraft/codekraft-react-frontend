var React = require("react")
import { connect } from 'react-redux'

import { Route, Switch } from 'react-router-dom'

import Header from './offline/header'
import Home from './offline/home'
import Login from './offline/login'
import Signup from './offline/signup'

import AuthChecker from './utils/auth-checker'


class Offline extends React.Component {

  render() {
    return (
      <section className="content content-no-sidebar">
          <Header />
          <Switch>
            <Route exact path="/" component={AuthChecker(Home, true, this.props.clients)} />
            <Route exact path="/login" component={AuthChecker(Login, true, this.props.clients)} />
            <Route exact path="/signup" component={AuthChecker(Signup, true, this.props.clients)} />
          </Switch>
      </section>
    );
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients
  }
}

export default connect(mapStateToProps)(Offline)
