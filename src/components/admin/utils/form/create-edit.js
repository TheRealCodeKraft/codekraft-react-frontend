import React from "react"

import Form from 'components/utils/form'

class CreateEditForm extends React.Component {

  constructor(props) {
    super(props)
    this.handleSubmitComplete = this.handleSubmitComplete.bind(this)
  }

  render() {
    return (
      <Form id={this.props.client.name + "-form"}
            entityId={this.props.entity ? this.props.entity.id : undefined}
            fields={this.props.form.attributes} 
            values={this.props.entity}
            submitLabel={this.props.form.submitLabel ? this.props.form.submitLabel : "Enregistrer"} 
            service={{client: this.props.client, func: this.props.mode === "edit" ? "update" : "create"}}
            onSubmitComplete={this.handleSubmitComplete}
            submitClass={"btn btn-accent"} 
      />
    )
  }

  handleSubmitComplete(data) {
    if (this.props.onSubmitComplete) this.props.onSubmitComplete(data)
  }

}

export default CreateEditForm
