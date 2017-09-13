var React = require("react")
import { connect } from 'react-redux'

import { Link } from "react-router-dom"

import Form from '../utils/form'

import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Panel } from 'react-bootstrap';

class Signup extends React.Component {

  constructor(props) {
    super(props);

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
        name: "pseudo",
        label: "Pseudo",
        title: "Choississez un pseudo",
        placeholder: "Pseudo",
        type: "text",
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
        label: "J'accepte les condition générales d'utilisation",
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
    if (this.state.submitted) {
      return (
        <div>
          <span>Inscription Réussi</span>
          <p>Votre inscription a bien été prise en compte. Vous pouvez maintenant accéder à votre compte en vous connectant grâce au formulaire disponible <Link to='/login'>ICI</Link></p>
          <p>Si vous souhaitez procéder à une autre inscription, cliquez <a href="#" onClick={this.resetForm}>LA</a></p>
        </div>
      )
    } else {
      return (
        

        <Grid className={"container-center animated slideInDown"}>

            <Row className={"view-header"}>
                <div className={"header-icon"}>
                    <i className={"page-header-icon pe pe-7s-user"}></i>
                </div>
                <div className={"header-title"}>
                    <h3>Créer un compte</h3>
                    <small>
                        Entrez les infos suivantes pour créer votre compte Open Business Labs.
                    </small>
                </div>
            </Row>

            <Panel className="panel panel-filled">
                        <Form id="signup-form" 
                              fields={this.fields} 
                              submitLabel="M'enregistrer"
                              submitClass={"btn btn-accent btn-signup"}  
                              onSubmit={this.handleSubmit} 
                              service={{client: this.props.clients.UserClient, func: "signup"}}
                              onSubmitComplete={this.handleSubmitComplete}
                              onSubmitError={this.handleSubmitError}
                        />
            </Panel>

        </Grid>

      )
    }
  }

  handleSubmit(values) {
  }

  handleSubmitComplete(data) {
    this.props.history.push("/login")
    //this.setState({submitted: true})
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
