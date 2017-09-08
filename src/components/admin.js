import React from "react"

import {Switch, Route} from "react-router"

import AuthChecker from './utils/auth-checker'
import CheckForAcls from 'components/utils/auth/check-for-acls'

import Header from './admin/header'
import Home from './admin/home'

import AdminConfig from 'config/admin-config'
import AdminPage from './admin/utils/admin-page'

import * as Clients from 'clients'

class Admin extends React.Component {

  constructor(props) {
    super(props)

    this.pages = AdminConfig
  }

  componentWillMount() {
    for (var index in this.pages) {
      if (!(this.pages[index].client instanceof Object)) {
        this.pages[index].client = Clients[this.pages[index].client]
      }
    }
  }

  render() {

    return (
      <div>
        <Header location={this.props.location} />
        <section className="content">
          <Switch>
            <Route exact path="/admin" component={AuthChecker(CheckForAcls(["admin"], Home))} />
            {this.pages.map(page => {
              return <Route key={page.route} exact path={page.route} component={AuthChecker(CheckForAcls(["admin"], AdminPage(page)))} />
            })}
          </Switch>
        </section>
      </div>
    )
  }

}

export default Admin
