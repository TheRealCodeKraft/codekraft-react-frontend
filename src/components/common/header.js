var React = require("react")
import { connect } from 'react-redux'

import NavLink from './header/link'
import ShowForAcls from '../utils/show-for-acls'

class Header extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      menu: false,
      dynItems: {}
    }

    this.handleHamburgerClick = this.handleHamburgerClick.bind(this)
  }

  componentWillMount() {
    var menuToLoad = Object.keys(this.props.menu).filter(menuKey => {
      var menu = this.props.menu[menuKey]
      return menu.source !== undefined && menu.source !== null
    })
    if (menuToLoad.length > 0) {
      var client, source, self=this
      for (var i in menuToLoad) {
        source = this.props.menu[menuToLoad[i]].source
        client = this.props.clients[source.client + "Client"]
        client.fetchAll({group: source.group}, function(data) {
          var dynItems = self.state.dynItems
          dynItems[menuToLoad[i]] = data
          self.setState({dynItems: dynItems}) 
        })
      }
    }
  }

  render() {

    if (this.props.custom !== undefined) {
      if (this.props.custom !== null) {
         return <this.props.custom menu={this.props.menu} root={this.props.root} admin={this.props.admin} />
      } else return null
    }

    var default_menu_entries = this.buildItemsFor("default")
    default_menu_entries = this.embedSandwich(default_menu_entries)
    var side_menu_entries = this.buildItemsFor("side")

    return (
      <div className="Menu">
        <div className="Menu-logo">
          <div className="logo-img" />
          <div className="Side-Menu">
            {side_menu_entries}
          </div>
        </div>
        <div className="Menu-links">
          {default_menu_entries}
        </div>
      </div>
    )
  }

  buildItemsFor(navKey) {
    var nav = this.props.menu[navKey]
    var menu_entries = []
    if (nav) {
      var menu_entry, menu, item, route
      if (nav.label) {
        menu_entries.push(<li className={"nav-category"}>{nav.label}</li>)
      }
      var items = nav.items
      if (nav.source !== undefined && nav.source !== null) {
        items = this.state.dynItems[navKey]
      }
      for (var index in items) {  
        item = items[index]
console.log(item)
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
          } else if (item.slug) {
            route = item.slug
          } else {
            route = (item.route[0] !== "/" ? this.props.root : "") + (item.route ? ((item.route[0] !== "/" && this.props.root !== "/") ? "/" : "") + item.route : "")
          }
          
          menu_entry = this.buildItem(nav, item, route)

          if (item.grants) {
            menu_entry = <ShowForAcls grants={item.grants}>{menu_entry}</ShowForAcls>
          }
          menu_entries.push(menu_entry)
        }
      }
    }
    return menu_entries
  }

  buildItem(nav, item, route) {
    var LinkComponent = nav.navLink ? nav.navLink : NavLink
    return <LinkComponent item={item} pathname={this.props.location.pathname} route={route} />
  }

  embedSandwich(items) {
    items = [<a href="#" onClick={this.handleHamburgerClick} className="Menu-link toggle-sidebar fa fa-bars"></a>].concat(items)
    if (!this.state.menu) {
      items = [<div className="logo-img menu-logo" />].concat(items)
    }
    return items
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

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {},
  }
}

export default connect(mapStateToProps)(Header)
