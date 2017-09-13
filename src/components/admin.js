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
    var groups = this.props.navigation.admin.menu
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
      <div>
        <Header location={this.props.location} />
        <section className="content">
          <Switch>
            <Route exact path="/admin" component={AuthChecker(CheckForAcls(["admin"], Home))} />
            {this.state.pages.map(page => {
              if (page.client) {
                return <Route key={page.route} exact path={"/admin/" + page.route} component={AuthChecker(CheckForAcls(["admin"], AdminPage(page)))} />
              } else {
                if (page.component) {
                  return <Route key={page.route} exact path={"/admin/" + page.route} component={AuthChecker(checkForAcls(["admin"], page.component))} />
                } else {
                  return null
                }
              }
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
