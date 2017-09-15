var React = require("react")
import { connect } from 'react-redux'

import { withRouter } from 'react-router'
import { NavLink, Link, Redirect } from 'react-router-dom'

import { Navbar } from 'react-bootstrap';
import ShowForAcls from '../utils/show-for-acls'

class Header extends React.Component {

  render() {
    if (this.props.custom !== undefined) {
      if (this.props.custom !== null) {
         return <this.props.custom menu={this.props.menu} root={this.props.root} />
      } else return null
    }

    var menu_entries = [], menu_entry, menu, item, route
    for (var key in this.props.menu) {
      menu = this.props.menu[key]
      if (menu.label) {
        menu_entries.push(<li className={"nav-category"}>{menu.label}</li>)
      }
      for (var index in menu.items) {  
        item = menu.items[index]
        if (item.display !== false) {
          if (item.type) {
            switch(item.type) {
              case "logout":
                route = "/logout"
                break
            }

          } else if (item.root === true) {
            route = this.props.root 
          } else if (item.switch) {
            route = item.switch
          } else {
            route = this.props.root + (item.route ? (this.props.root !== "/" ? "/" : "") + item.route : "")
          }
          
          menu_entry = <NavLink exact to={route} className={"Menu-link" + (this.props.location.pathname === route ? " Menu-link--active" : "")}>
                         {item.title}
                       </NavLink>

          if (item.grants) {
            menu_entry = <ShowForAcls grants={item.grants}>{menu_entry}</ShowForAcls>
          }
          menu_entries.push(menu_entry)
        }
      }
    }

    return (
      <div className="Menu">
        <div className="Menu-logo">
          <img src="/assets/img/logo-skeleton.png" alt="CodeKraft Skeleton logo" />
        </div>
        <div className="Menu-links">
          {menu_entries}
        </div>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {}
  }
}

export default withRouter(connect(mapStateToProps)(Header))
