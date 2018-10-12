var React = require("react")
import { connect } from 'react-redux'

import { Link } from "react-router-dom"

import Form from '../utils/form'

class Signup extends React.Component {

  constructor(props) {
    super(props);

    let termsOfUseLabel = "J'accepte les condition générales d'utilisation"
    if (this.props.termsOfUseLink) {
      termsOfUseLabel = (<span>J'accepte les <a href={this.props.termsOfUseLink} title="Conditions générales d'utilisation" target="_blank">condition générales d'utilisation</a></span>)
    }

    this.fields = [
      {
        name: "firstname",
        title: "Entrez votre prénom",
        label: "Prénom",
        placeholder: "Prénom",
        type: "text",
        required: true
      },
      {
        name: "lastname",
        label: "Nom",
        title: "Entrez votre nom",
        placeholder: "Nom",
        type: "text",
        required: true
      },
      {
        name: "email",
        label: "Email",
        title: "Entrez votre email",
        placeholder: "Email",
        type: "email",
        required: true
      },
      {
        name: "password",
        label: "Mot de passe",
        title: "Entrez votre mot de passe",
        placeholder: "Mot de passe",
        type: "password",
        required: true
      },
      {
        name: "password_confirm",
        label: "Confirmation du mot de passe",
        title: "Confirmation du mot de passe",
        placeholder: "Confirmation du mot de passe",
        type: "password",
        required: true,
        confirmFor: "password"
      },
      {
        name: "cgu",
        label: termsOfUseLabel,
        title: "J'accepte les condition générales d'utilisation",
        type: "checkbox",
        required: true,
        wanted: true,
        inputClass:"checkbox",
        className:"test"
      }
    ];

    this.state = {
      submitted: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
    this.resetForm = this.resetForm.bind(this)
  }

  render() {
    return (
      <div>
        <Form id="signup-form" 
              labels={this.props.labels}
              fields={this.fields} 
              submitLabel="M'enregistrer"
              submitClass={this.props.submitClass ? this.props.submitClass : "btn btn-accent btn-signup"}  
              onSubmit={this.handleSubmit} 
              service={{client: this.props.clients.UserClient, func: "signup"}}
              onSubmitComplete={this.handleSubmitComplete}
              onSubmitError={this.handleSubmitError}
        />
        {this.props.showLoseLinks !== false
         ? [<Link className={"btn btn-default"} to="/login">J'ai déjà un compte</Link>,
            <Link to="/forgot-password">Mot de passe oublié</Link>]
         : null}
      </div>
    )
  }

  handleSubmit(values) {
		this.setState({values})
  }

  handleSubmitComplete(data) {
		if (this.props.onSignedIn) {
			this.props.onSignedIn(this.state.values, data)
		} else {
	    this.props.history.push("/login")
		}
  }

  handleSubmitError(data) {
    console.log("submit error !")
  }

  resetForm(e) {
    e.preventDefault()
    this.setState({submitted: false})
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients
  }
}

export default connect(mapStateToProps)(Signup)
