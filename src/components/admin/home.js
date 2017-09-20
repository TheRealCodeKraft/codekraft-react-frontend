var React = require("react")
import { connect } from 'react-redux'

import { Link } from "react-router-dom"

class Home extends React.Component {

  render() {

    const groups = []
    for (var key in this.props.navigation.admin.menu) {
      groups.push(this.props.navigation.admin.menu[key])
    }

    if (groups.filter(group => { return group.hiddenOnHome === true }).length === groups.length) {
      return (
        <section className="Example">
          <h1>Bienvenue dans l'administration !</h1>
          <p>Vous n'avez aucun entité encore configurée dans votre application</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae nulla tortor. Fusce laoreet dolor at blandit placerat. Quisque a venenatis turpis. Sed a turpis magna. Aliquam imperdiet sollicitudin nulla, a sagittis est bibendum varius. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum sed lectus a arcu dignissim cursus.</p>
        </section>
      )
    }

    return (
      <section>
        {groups.map(group => {
          if (group.hiddenOnHome) return null
          return [<h1>{group.label}</h1>,
                  group.items.map(item => {
                    return (<Link to={"/admin/" + item.route}>
                              <h2>{item.title}</h2>
                              <div>{item.description ? item.description : ""}</div>
                            </Link>)
                  })
                 ]
        })}
      </section>
    )
  }

}

function mapStateToProps(state) {
  return {
    navigation: state.bootstrap.navigation
  }
}

export default connect(mapStateToProps)(Home)
