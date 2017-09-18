var React = require("react")
import { connect } from 'react-redux'

import { Link } from "react-router-dom"

class Home extends React.Component {

  render() {

    return (
      <section className="Example">
        <h1>Bonjour {this.props.me.firstname} !</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae nulla tortor. Fusce laoreet dolor at blandit placerat. Quisque a venenatis turpis. Sed a turpis magna. Aliquam imperdiet sollicitudin nulla, a sagittis est bibendum varius. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum sed lectus a arcu dignissim cursus.</p>
      </section>
    )
  }

}

function mapStateToProps(state) {
  return {
    me: state.userState.me || null
  }
}

export default connect(mapStateToProps)(Home)
