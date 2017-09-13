var React = require("react")
import { connect } from 'react-redux'

import { Link } from "react-router-dom"
import { Grid, Row, Col, Panel } from 'react-bootstrap';

class Home extends React.Component {

  render() {

    return (
      <section className={"content"}>
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <h1><i className={"pe pe-7s-home text-warning"}></i> Accueil</h1>
              <h2><small>Bienvenue sur ton compte Open Business Labs <span className={"c-white"}>{this.props.me.firstname}</span> !</small></h2>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Link to="/dashboard/profile" className={"panel-home-student"}>
                <Panel className={"panel-filled"}>
                  <h2>
                    <i className={"pe pe-7s-user pe-3x pe-va text-warning"}></i> Profil
                  </h2>
                  <div>Compléter ton profil et tes infos personnelles.</div>
                </Panel>
              </Link>
            </Col>
            <Col md={6}>
              <Link to="/dashboard/sessions" className={"panel-home-student"}>
                <Panel className={"panel-filled"}>
                  <h2>
                    <i className={"pe pe-7s-joy pe-3x pe-va text-warning"}></i> Jeux
                  </h2>
                  <div>Consulter les jeux auxquels tu es inscrit et les résultats de ceux auxquels tu as participé.</div>
                </Panel>
              </Link>
            </Col>
          </Row>
        </Grid>
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
