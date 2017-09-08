import React from "react"

class DeleteForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      deleting: false
    }

    this.handleCancel = this.handleCancel.bind(this)
    this.handleConfirm = this.handleConfirm.bind(this)

    this.handleDeleted = this.handleDeleted.bind(this)
  }

  render() {
    var content = null
    if (this.props.entity) {
      if (this.state.deleting) {
        content = <div style={{padding: 20}}>
                    Suppression de <strong>{this.props.entity[this.props.delete.labels.identifier]}</strong> en cours ...
                  </div>
      } else {
        content = <div style={{padding: 20, display: "flex", flexDirection: "column"}}>
                    <span>Êtes-vous sûr de vouloir supprimer {this.props.delete.labels.entity} <strong>{this.props.entity[this.props.delete.labels.identifier]}</strong> ?</span>
                    <div>
                      <button onClick={this.handleCancel} className="btn btn-danger">Non</button>
                      <button onClick={this.handleConfirm} className="btn btn-accent">Oui</button>
                    </div>
                  </div>
      }
    }
    return content
  }

  handleCancel() {
    if (this.props.onDeleted) this.props.onDeleted()
  }

  handleConfirm() {
    this.setState({deleting: true}, this.deleteEntity())
  }

  deleteEntity() {
    this.props.client.destroy(this.props.entity.id, this.handleDeleted)
  }

  handleDeleted(data) {
    this.setState({deleting: false}, function() {
      if (this.props.onDeleted) this.props.onDeleted()
    })
  }

}

export default DeleteForm
