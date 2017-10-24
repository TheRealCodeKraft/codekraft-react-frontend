import React from "react"

import { NavLink } from 'react-router-dom'

class Link extends React.Component {

  render() {
    const route = this.props.route
    const item = this.props.item
    const pathname = this.props.pathname

    return (
      <NavLink exact to={route} className={"Menu-link" + (pathname === route ? " Menu-link--active" : "") + (item.faIcon ? " fa fa-" + item.faIcon : "")}>
        {item.faIcon ? "" : item.title}
      </NavLink>
    )
  }

}

export default Link
