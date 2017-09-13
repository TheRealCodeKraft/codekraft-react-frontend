var React = require("react");
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  render() {

    return (

      <div className="back-link">
            <Link to="/"><img src="assets/images/logo-obl-small.png" alt="Open Business Labs" /></Link>
      </div>

    )
  }

  handleLogout(e) {
    e.preventDefault()
    this.props.clients.ApiClient.logout()
    this.setState({logout: true})
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients,
    me: state.userState.me
  }
}

export default connect(mapStateToProps)(Header)
