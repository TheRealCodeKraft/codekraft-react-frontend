var React = require("react")
import { connect } from 'react-redux'

import {Switch, Route} from "react-router"

import AuthChecker from './utils/auth-checker'
import CheckForAcls from './utils/check-for-acls'

import Header from './admin/header'
import Home from './admin/home'

import AdminPage from './admin/utils/admin-page'

class Admin extends React.Component {

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    var pages = this.props.navigation.admin
    for (var index in pages) {
      if (!(pages[index].client instanceof Object)) {
        pages[index].client = this.props.clients[pages[index].client]
      }
    }
    this.setState({pages: pages})
  }

  render() {

    return (
      <div>
        <Header location={this.props.location} />
        <section className="content">
          <Switch>
            <Route exact path="/admin" component={AuthChecker(CheckForAcls(["admin"], Home))} />
            {this.state.pages.map(page => {
              return <Route key={page.route} exact path={page.route} component={AuthChecker(CheckForAcls(["admin"], AdminPage(page)))} />
            })}
          </Switch>
        </section>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {},
    navigation: state.bootstrap.navigation || {admin: {items: []}}
  }
}

export default connect(mapStateToProps)(Admin)
