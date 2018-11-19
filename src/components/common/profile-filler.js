var React = require("react")
import { connect } from 'react-redux'

import {withRouter} from 'react-router'

import AuthChecker from '../utils/auth-checker'
import Form from '../utils/form'

import {Grid, Row, Col} from "react-bootstrap"

class ProfileFiller extends React.Component {

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
      }/*,
      {
        name: "temp",
        type: "hidden",
        defaultValue: false
      }*/
    ];

    this.state = {
      submitted: false
    }

    this.handleCancel = this.handleCancel.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
  }

  render() {
    return (
        <Grid fluid>
          <Row>
            <Col xs={12}>
              <h1>Bienvenue sur Open Business Labs !</h1>
              <p>Avant de participer à votre session de jeu, veuillez compléter votre profile en remplissant le formulaire suivant : </p>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <Form id="profile-filler-form" 
                    entityId={this.props.me.id}
                    fields={this.fields} 
                    submitLabel="M'enregistrer"
                    submitClass={"btn btn-accent btn-signup"}  
                    cancelButton={true}
                    onSubmit={this.handleSubmit} 
                    service={{client: this.props.clients.UserClient, func: "update"}}
                    onCancel={this.handleCancel}
                    onSubmitComplete={this.handleSubmitComplete}
                    onSubmitError={this.handleSubmitError}
              />
            </Col>
          </Row>
        </Grid>
    )
  }

  handleCancel() {
    this.props.clients.ApiClient.logout()
  }

  handleSubmit(values) {
  }

  handleSubmitComplete(data) {
    this.setState({submitted: true}, function() {
			this.props.onFinished(data)
      this.props.history.push("/")
    })
  }

  handleSubmitError(data) {
    console.log("submit error !")
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients || {},
    me: state.userState.me
  }
}

export default withRouter(connect(mapStateToProps)(ProfileFiller))
