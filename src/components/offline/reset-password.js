import React from "react"
import { connect } from 'react-redux'

import Form from '../utils/form'
import { Link } from 'react-router-dom'

import { withRouter } from "react-router"

class ResetPassword extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }

    this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
  }

  componentDidMount() {
		if (this.props.me) {
      this.props.clients.ApiClient.logout()
		}

    if (this.props.location.search.indexOf("email") !== -1 && this.props.location.search.indexOf("key") !== -1) {
      var splitted = this.props.location.search.replace("?", "").split("&")
      var emailSplit = splitted[0].split("=")
      var stampSplit = splitted[1].split("=")
      this.setState({email: emailSplit[1], stamp: stampSplit[1]}, function() {
        this.props.clients.UserClient.checkStamp({email: emailSplit[1], stamp: stampSplit[1]})
      })
    } else {
      this.props.history.push("/")
    }
  }

  render() {
    if (!this.props.stamp) {
      return (
        <span>Recherche de votre compte</span>
      )
    } else if (!this.props.stamp.found || !this.props.stamp.stamp_ok || !this.props.stamp.stamp_expiration_ok) {
      return (
        <div>
          <span>Nous n'avons pas réussi à vous authentifier</span>
          {!this.props.stamp.stamp_expiration_ok
           ? <div>
               <span>Le lien que vous avez utilisé a expiré, il n'est valable que 2 jours.</span>
               <span>Cliquer <Link to="/forgot-password">ici</Link> pour recevoir un nouveau mail de réinitialisation de mot de passe</span>
             </div>
           : <div>
               <span>Le lien que vous avez utilisé est peut-être trop ancien.</span>
               <span>Cliquer <Link to="/forgot-password">ici</Link> pour recevoir un nouveau mail de réinitialisation de mot de passe</span>
             </div>
          }
        </div>
      )
    } else {
      return (
        <div>
          <span>Vous pouvez maintenant réinitialiser votre mot de passe</span>
          <Form id="reset-form" 
                clients={this.props.clients}
                entityId={this.props.stamp.user_id}
                fields={[
                  {
                    name: "email",
                    type: "hidden",
                    defaultValue: this.state.email
                  },
                  {
                    name: "stamp",
                    type: "hidden",
                    defaultValue: this.state.stamp
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
                  }
                ]} 
                submitLabel="Envoyer" 
                onSubmit={this.handleSubmit}
                submitClass={"btn btn-accent btn-signup"} 
                service={{client: this.props.clients.UserClient, func: "updatePassword"}}
                onSubmitComplete={this.handleSubmitComplete}
           />
        </div>
      )
    }
  }

  handleSubmitComplete(data) {
    this.props.history.push("/login")
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients,
		me: state.userState.me,
    stamp: state.userState.stamp || null,
    password_updated: state.userState.password_updated || undefined
  }
}

export default connect(mapStateToProps)(withRouter(ResetPassword))
