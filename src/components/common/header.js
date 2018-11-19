var React = require("react")
import clone from "lodash.clone"

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

  render() {

    if (this.props.custom !== undefined) {
      if (this.props.custom !== null) {
         return <this.props.custom menu={this.props.menu} root={this.props.root} admin={this.props.admin} location={this.props.location} token={this.props.token} name={this.props.name} />
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

	buildNavFor(navKey) {
    const nav = this.props.menu[navKey]
		return {
			label: nav.label,
			items: nav.items.map((item, index) => (this.getRawItem(item))).filter((item) => (item !== null))
		}
	}

	getRawItem(item) {
		return getRawItem({ item, token: this.props.token, root: this.props.root })
	}

	getRawItems(menuKey) {
		if (!this.props.menu[menuKey]) return null

		return getRawItems({
			items: this.props.menu[menuKey].items,
			token: this.props.token,
			root: this.props.root
		})
	}

  buildItemsFor(navKey) {
    var nav = this.props.menu[navKey]
    var menu_entries = []
    if (nav) {
      if (nav.label) {
        menu_entries.push(<li className={"nav-category"}>{nav.label}</li>)
      }
      var items = nav.items
      if (nav.groups) {
        menu_entries.push(this.getGroups(nav.groups, nav))
      }
      menu_entries.push(this.getItems(items, nav))
    }
    return menu_entries
  }

  getGroups(groups, nav) {
    var menu_entries = []
    for (var index in nav.groups) {
      menu_entries.push(<li className="nav-category">{nav.groups[index]["label"]}</li>)
      menu_entries.push(this.getItems(nav.groups[index]["items"], nav))
    }
    return menu_entries
  }

  getItems(items, nav) {
    var menu_entries = []
    var menu_entry, menu, item, route
    for (var index in items) {
      item = this.getRawItem(items[index])
			if (item !== null) {
        if (item.route !== undefined) {
          menu_entry = this.buildItem(nav, item, item.route)

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
    var className
    if (nav.linkClassName) {
      className = nav.linkClassName
    }
    else {
      className = "Menu-link" + (this.props.location.pathname === route ? " Menu-link--active" : "") + (item.faIcon ? " fa fa-" + item.faIcon : "")
    }
    if (nav.linkComponent) {
      return <nav.linkComponent item={item} pathname={this.props.location.pathname} route={route} active={this.props.location.pathname === route} />
    } else {
      return <LinkComponent item={item} pathname={this.props.location.pathname} route={route} className={className} />
    }
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

export default Header

export function getRawItem({ item, token, root }) {
	if (item.display !== false && !(token && item.discardOnLogin || !token && item.onlyOnLogin)) {
		var route=undefined
		if (item.type) {
			switch(item.type) {
				case "logout":
				route = "/logout"
				break
			}

		} else if (item.root === true) {
			route = root
		} else if (item.switch) {
			route = item.switch
		} else if (item.route){
			route = (item.route[0] !== "/" ? root : "") + (item.route ? ((item.route[0] !== "/" && root !== "/") ? "/" : "") + item.route : "")
		}

		// Clone the item in order to not change the base item
		item = clone(item)
		item.route = route
		return item
	} else {
		return null
	}
}

export function getRawItems({ items, token, root }) {
	return items.map(item => (getRawItem({ item, token, root }))).filter(item => (item && item.display !== false))
}
