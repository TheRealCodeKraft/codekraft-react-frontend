import React from "react"
import { connect } from 'react-redux'

import Form from '../utils/form'
import { Link } from 'react-router-dom'

class ForgotPassword extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      found: undefined
    }

    this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
  }

  render() {
    var content = null
    switch(this.state.found) {
      case undefined:
        content = this.form()
        break
      case true:
        content = this.found()
        break
      case false:
        content = [
          <span>Aucun compte n'a été identifié avec cette adresse email</span>,
          this.form()
        ]
        break
    }

    return <div>{content}</div>
  }

  form() {
    return [
      <Form id="login-form" 
            clients={this.props.clients}
            fields={[
              {
                name: "email",
                label: "Email",
                title: "Email",
                placeholder: "Email",
                type: "text",
                required: true
              }
            ]} 
            submitLabel="Envoyer" 
            onSubmit={this.handleSubmit}
            submitClass={"btn btn-accent btn-signup"} 
            service={{client: this.props.clients.UserClient, func: "forgotPassword"}}
            onSubmitComplete={this.handleSubmitComplete}
       />,
			 this.props.showLoseLinks
	      ? [<Link className={"btn btn-default"} to="/login">J'ai déjà un compte</Link>,
      		<Link className={"btn btn-default"} to="/signup">Créer un compte</Link>]
				: null
			]
  }

  found() {
    return [
      <span>Yay! Un email vous a été envoyé pour vous permettre de réinitialiser votre mot de passe</span>,
      <Link to='/'>Retour à la page d'accueil</Link>]
  }

  handleSubmitComplete(data) {
		if (this.props.onSubmitComplete) {
			this.props.onSubmitComplete(data)
		} else {
	    this.setState({found: data.found})
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

export default connect(mapStateToProps)(ForgotPassword)
