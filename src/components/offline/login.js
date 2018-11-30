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
    if (this.state.loggedIn) return <Redirect to="/" />
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
              labels={this.props.labels}
              clients={this.props.clients}
              fields={this.fields}
              submitLabel={this.props.submitLabel ? this.props.submitLabel : "Me connecter"}
              className={this.props.className}
              onSubmit={this.handleSubmit}
              onSubmitError={this.handleSubmitError}
              submitClass={this.props.submitClass ? this.props.submitClass : "btn btn-accent btn-signup"}
              service={{client: this.props.clients.ApiClient, func: "login"}}
              onSubmitComplete={this.handleSubmitComplete}
        >
				{this.props.children}
				</Form>
        { this.props.showLoseLinks !== false
          ? [<Link key="signup-button" className={"btn btn-default"} to="/signup">Créer un compte</Link>,
             <Link key="forgot-password-button" to="/forgot-password">Mot de passe oublié</Link>]
          : null}
      </div>
    )
  }

  handleSubmit(values) {
  }

  handleSubmitComplete(data) {
		if (this.props.onLoggedIn) this.props.onLoggedIn()
		else {
	    this.setState({loggedIn: true})
		}
  }

  handleSubmitError = (data) => {
		if (this.props.onSubmitError) {
			this.props.onSubmitError(data)
		}
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
