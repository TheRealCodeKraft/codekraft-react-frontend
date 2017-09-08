import React from "react"

import { Link } from "react-router-dom"

import { Grid, Row, Col, Panel } from 'react-bootstrap';

class Home extends React.Component {

  render() {
    return (

            <Grid fluid>

                <Row>
                    <Col xs={12}>

                        <h1><i className={"pe pe-7s-tools text-warning"}></i> Administration</h1>

                    </Col>
                </Row>

                <Row>
                    <Col md={6}>

                        <Link to="/admin/sessions" className={"panel-home-student"}>
                            <Panel className={"panel-filled"}>
                                    <h2>
                                        <i className={"pe-7s-date pe-3x pe-va text-warning"}></i> Sessions
                                    </h2>
                                    <div>Voir les sessions de jeu.</div>
                            </Panel>
                        </Link>

                    </Col>
                    <Col md={6}>

                        <Link to="/admin/users" className={"panel-home-student"}>
                            <Panel className={"panel-filled"}>
                                    <h2>
                                        <i className={"pe pe-7s-users pe-3x pe-va text-warning"}></i> Utilisateurs
                                    </h2>
                                    <div>Voir les utilisateurs.</div>
                            </Panel>
                        </Link>

                    </Col>
                </Row>

            </Grid>

    )
  }

}

export default Home
