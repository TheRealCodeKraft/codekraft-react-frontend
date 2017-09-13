var React = require("react")
import { connect } from 'react-redux'
import { NavLink, Link, Redirect } from 'react-router-dom'

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

    var menu_entries = [], menu, item
    for (var key in this.props.navigation.admin.menu) {
      menu = this.props.navigation.admin.menu[key]
      menu_entries.push(<li className={"nav-category"}>{menu.label}</li>)
      for (var index in menu.items) {  
        item = menu.items[index]
        menu_entries.push(<li className={this.props.location.pathname === ("/admin/" + item.route) ? "active" : ""}><NavLink exact to={"/admin/" + item.route}>{item.title}</NavLink></li>)
      }
    }

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
                      <Link to="/admin" className={"navbar-brand navbar-admin"}>
                          <img src="/assets/images/logo-obl-mini.png" alt="Open Business Labs" /> <span>OBL</span>
                      </Link>
                  </Navbar.Header>
                  <Navbar.Collapse id="navbar">
                      <div className={"left-nav-toggle"}>
                          <a href="#" onClick={this.handleHamburgerClick}>
                              <i className={"stroke-hamburgermenu"}></i>
                          </a>
                      </div>
                  </Navbar.Collapse>
          </Navbar>
          <aside className={"navigation"} style={{height: "auto"}}>
              <nav>
                  <ul className={"nav luna-nav"}>
                      <li className={"nav-category"}>
                        Général
                      </li>
                      <li className={this.props.location.pathname === "/admin" ? "active" : ""}>
                        <NavLink exact to="/admin">Tableau de bord admin</NavLink>
                      </li>
                      <li><NavLink exact to="/dashboard">Retour au site</NavLink></li>
                      <li><a href="#" onClick={this.handleLogout}>Se déconnecter</a></li>
                      {menu_entries}
                  </ul>
              </nav>
          </aside>

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
    this.props.clients.ApiClient.logout()
    this.setState({logout: true})
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {},
    navigation: state.bootstrap.navigation
  }
}

export default connect(mapStateToProps)(Header)
