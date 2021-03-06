var React = require("react")

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
                    Suppression <strong>{this.props.delete ? (" de " + this.props.entity[this.props.delete.labels.identifier]) : ""}</strong> en cours ...
                  </div>
      } else {
        content = <div className="deletion-container" style={{display: "flex", flexDirection: "column"}}>
                    <span>Êtes-vous sûr de vouloir supprimer {this.props.delete ? (<span>{this.props.delete.labels.entity} <strong>{this.props.entity[this.props.delete.labels.identifier]} </strong></span>) : null}?</span>
                    <div className="delete-confirm-buttons">
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
console.log(this.props.client)
    this.props.client.destroy(this.props.entity.id, this.handleDeleted)
  }

  handleDeleted(data) {
    this.setState({deleting: false}, function() {
      if (this.props.onDeleted) this.props.onDeleted()
    })
  }

}

export default DeleteForm
