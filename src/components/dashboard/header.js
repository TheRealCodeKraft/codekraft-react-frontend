import React from 'react'
import { connect } from 'react-redux'

import { NavLink, Link, Redirect } from 'react-router-dom'
import ShowForAcls from '../utils/show-for-acls'
import { Navbar } from 'react-bootstrap';

class Header extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      logout: false,
      menu: false
    }

    this.handleLogout = this.handleLogout.bind(this)
    this.handleHamburgerClick = this.handleHamburgerClick.bind(this)
  }

  render() {
    if (this.state.logout) return <Redirect to="/" />
    return (
      <header id="header">   

          <Navbar fixedTop fluid>
                  <Navbar.Header>
                      <div id="mobile-menu">
                          <div className={"left-nav-toggle"}>
                              <a href="#" onClick={this.handleHamburgerClick}>
                                  <i className={"stroke-hamburgermenu"}></i>
                              </a>
                          </div>
                      </div>
                      <Link to="/" className={"navbar-brand"}>
                          <img src="/assets/images/logo-obl-mini.png" alt="Open Business Labs" /> <span>OBL</span>
                      </Link>
                  </Navbar.Header>
                  {this.props.showAside
                   ? <Navbar.Collapse id="navbar">
                       <div className={"left-nav-toggle"}>
                         <a href="#" onClick={this.handleHamburgerClick}>
                           <i className={"stroke-hamburgermenu"}></i>
                         </a>
                       </div>
                     </Navbar.Collapse>
                   : null}
          </Navbar>

          {this.props.showAside
           ? <aside className={"navigation"}>
              <nav>
                  <ul className={"nav luna-nav"}>
                    {this.props.navigation.dashboard.items.map(menu => {
                      return [
                        <li className={"nav-category"}>{menu.label}</li>,
                        menu.items.map(item => {
                          var path = "/dashboard" + ((item.path && item.path !== "") ? ("/" + item.path) : "")
                          return (
                            <li className={this.props.location.pathname === path ? "active" : ""}>
                              <NavLink exact to={path}>{item.label}</NavLink>
                            </li>
                          )
                        })
                      ]
                    })}

                    <li><a href="#" onClick={this.handleLogout}>Déconnexion</a></li>

                  </ul>
               </nav>
             </aside>
           : null}

      </header>
    );

  }

  handleHamburgerClick(e) {
    e.preventDefault()
    this.setState({menu: !this.state.menu}, function() {
      if (this.state.menu) {
        document.body.className += " nav-toggle"
      } else {
        document.body.className -= " nav-toggle"
      }
    })
  }

  handleLogout(e) {
    e.preventDefault()
    var self = this
    this.props.clients.AuthClient.logout(function() {
      self.props.history.push("/")
      self.setState({logout: true})
    })
  }

}

function mapStateToProps(state) {
  return {
    navigation: state.bootstrap.navigation || {dashboard: { items: [] }}
  }
}

export default connect(mapStateToProps)(Header)
