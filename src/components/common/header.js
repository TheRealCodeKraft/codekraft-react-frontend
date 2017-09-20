var React = require("react")
import NavLink from './header/link'
import ShowForAcls from '../utils/show-for-acls'

class Header extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      menu: false
    }

    this.handleHamburgerClick = this.handleHamburgerClick.bind(this)
  }

  render() {
    if (this.props.custom !== undefined) {
      if (this.props.custom !== null) {
         return <this.props.custom menu={this.props.menu} root={this.props.root} />
      } else return null
    }

    var default_menu_entries = this.buildItemsFor(this.props.menu.default)
    default_menu_entries = this.embedSandwich(default_menu_entries)
    var side_menu_entries = this.buildItemsFor(this.props.menu.side)

    return (
      <div className="Menu">
        <div className="Menu-logo">
          <img src="/assets/img/logo-skeleton.png" alt="CodeKraft Skeleton logo" />
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

  buildItemsFor(nav) {
    var menu_entries = []
    if (nav) {
      var menu_entry, menu, item, route
      if (nav.label) {
        menu_entries.push(<li className={"nav-category"}>{nav.label}</li>)
      }
      for (var index in nav.items) {  
        item = nav.items[index]
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
      items = [<img src="/assets/img/logo-skeleton.png" alt="CodeKraft Skeleton logo" />].concat(items)
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

export default Header
