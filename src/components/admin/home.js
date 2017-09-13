var React = require("react")
import { connect } from 'react-redux'

import { Link } from "react-router-dom"

import { Grid, Row, Col, Panel } from 'react-bootstrap';

class Home extends React.Component {

  render() {

    const groups = []
    for (var key in this.props.navigation.admin.menu) {
      groups.push(this.props.navigation.admin.menu[key])
    }
    return (
      <Grid fluid>
        {groups.map(group => {
          if (group.hiddenOnHome) return null

          return [<Row>
                    <Col xs={12}>
                      <h1><i className={"pe pe-7s-tools text-warning"}></i> {group.label}</h1>
                    </Col>
                  </Row>,
                  <Row>
                  {group.items.map(item => {
                    return (<Col md={6}>
                              <Link to={"/admin/" + item.route} className={"panel-home-student"}>
                                <Panel className={"panel-filled"}>
                                  <h2>
                                    <i className={"pe-7s-" + (item.icon ? item.icon : "pin") +  " pe-3x pe-va text-warning"}></i> {item.title}
                                  </h2> 
                                  <div>{item.description ? item.description : ""}</div>
                                </Panel>
                              </Link>
                            </Col>)
                  })}
                  </Row>
          ]
        })}
      </Grid>
    )
  }

}

function mapStateToProps(state) {
  return {
    navigation: state.bootstrap.navigation
  }
}

export default connect(mapStateToProps)(Home)
