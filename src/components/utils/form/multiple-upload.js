import React from "react"

import DropZone from "react-dropzone"

class MultipleUpload extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      files: []
    }
  }

  componentWillReceiveProps(props) {
    if (props.value) {
      if (props.value == "RESET") {
        this.setState({files: []})
      } else if (this.state.files.length == 0) {
        this.setState({files: props.value})
      }
    }
  }

  render() {
    return (
      <div className="multiple-upload">
        <div className="files">
          {this.state.files.map((file, index) => (
            <div className="file-thumbnail">
              <a onClick={this.handleRemove.bind(this, index)}>
								{ this.props.removeIcon
									? this.props.removeIcon
									: <i className="fa fa-remove" />
								}
							</a>
              <img src={file.preview ? file.preview : file.file_url} />
            </div>
          ))}
        </div>
        { (this.props.showZone == undefined || this.props.showZone === true)
          ? <DropZone 
              onDrop={this.handleDrop.bind(this)}
              className="multiple-upload-zone"
              activeClassName="active-zone"
            >
              <span>Déposez des fichiers ici</span>
              <span>ou cliquez pour sélectionner des fichiers</span>
            </DropZone>
          : null}
      </div>
    )
  }

  handleDrop(acceptedFiles, rejectedFiles) {
    var files = this.state.files
    for (var i in acceptedFiles) {
      files.push(acceptedFiles[i])
    }
    this.setState({files}, () => {
      this.props.onChange(this.state.files)
    })
  }

  handleRemove(index, e) {
    e.preventDefault()
    var files = this.state.files
    files.splice(index, 1)
    this.setState({files})
  }

}

export default MultipleUpload
