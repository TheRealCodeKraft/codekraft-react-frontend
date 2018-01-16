import React from "react"

import { NavLink } from 'react-router-dom'

class Link extends React.Component {

  render() {
    const route = this.props.route
    const item = this.props.item
    const pathname = this.props.pathname

    return (
      <li className={pathname === route ? "active" : ""}>
        <NavLink exact to={route}>
          {item.title}
        </NavLink>
      </li>
    )
  }

}

export default Link
