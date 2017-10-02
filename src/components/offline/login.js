var React = require("react")
import { connect } from 'react-redux'

import { Redirect } from "react-router-dom"

import Form from '../utils/form'
import { Link } from 'react-router-dom'

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
      <div>  
        {this.props.newUser
         ? <div className="alert alert-success" style={{marginTop: 0, display: "flex", alignItems: "center"}}>
             <i className="pe pe-7s-door-lock" style={{fontSize: "3em", marginRight: 15}}></i>
             Votre compte a été créé, vous pouvez maintenant vous connecter.
           </div>
         : null}

        {this.props.passwordUpdated
         ? <div className="alert alert-success" style={{marginTop: 0, display: "flex", alignItems: "center"}}>
             <i className="pe pe-7s-door-lock" style={{fontSize: "3em", marginRight: 15}}></i>
             Votre mot de passe a bien été modifié, vous pouvez maintenant vous connecter
           </div>
         : null}

        <Form id="login-form" 
              clients={this.props.clients}
              fields={this.fields} 
              submitLabel="Me connecter" 
              onSubmit={this.handleSubmit}
              submitClass={"btn btn-accent btn-signup"} 
              service={{client: this.props.clients.ApiClient, func: "login"}}
              onSubmitComplete={this.handleSubmitComplete}
        />
        <Link className={"btn btn-default"} to="/signup">Créer un compte</Link>
        <Link to="/forgot-password">Mot de passe oublié</Link>
      </div>
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
    newUser: state.userState.newUser || null,
    passwordUpdated: state.userState.password_updated || null
  }
}

export default connect(mapStateToProps)(Login)
