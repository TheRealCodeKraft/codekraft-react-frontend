var React = require("react")
import { connect } from 'react-redux'

import { Redirect } from "react-router-dom"

import Form from '../utils/form'
import { Link } from 'react-router-dom'

import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      error: false,
    }

    this.fields = [
      {
        name: "email",
        label: "Email",
        title: "Email",
        placeholder: "Email",
        type: "text",
        required: true
      },
      {
        name: "password",
        label: "Mot de passe",
        placeholder: "Mot de passe",
        title: "Mot de passe",
        type: "password",
        required: true
      },
    ]

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
  }

  render() {
    if (this.state.loggedIn) return <Redirect to="/dashboard" />
    return (
      
      <Grid className="container-center animated slideInDown">

            <Row className="view-header">
                <div className={"header-icon"}>
                    <i className={"pe page-header-icon pe-7s-unlock"}></i>
                </div>
                <div className={"header-title"}>
                    <h3>Login</h3>
                    <small>
                        Entrez vos identifiants pour vous connecter.
                    </small>
                </div>
            </Row>

            {this.props.newUser
             ? <Row>
                 <div className="alert alert-success" style={{marginTop: 0, display: "flex", alignItems: "center"}}>
                   <i className="pe pe-7s-door-lock" style={{fontSize: "3em", marginRight: 15}}></i>
                   Votre compte a été créé, vous pouvez maintenant vous connecter.
                 </div>
               </Row>
             : null}

            <Panel className="panel panel-filled">
                    
                    <Form id="login-form" 
                        clients={this.props.clients}
                        fields={this.fields} 
                        submitLabel="Me connecter" 
                        onSubmit={this.handleSubmit}
                        submitClass={"btn btn-accent btn-signup"} 
                        service={{client: this.props.clients.ApiClient, func: "login"}}
                        onSubmitComplete={this.handleSubmitComplete}
                    />
                    <Link className={"btn btn-default btn-signup"} to="/signup">Créer un compte</Link>
                
            </Panel>

            <div className="text-center small">
                    <Link to="/">Mot de passe oublié</Link>
            </div>

        </Grid>
    )
  }

  handleSubmit(values) {
  }

  handleSubmitComplete(data) {
    this.setState({loggedIn: true})
  }
}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients,
    newUser: state.userState.newUser || null
  }
}

export default connect(mapStateToProps)(Login)
