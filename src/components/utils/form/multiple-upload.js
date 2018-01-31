import React from "react"

import DropZone from "react-dropzone"

class MultipleUpload extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      files: []
    }
  }

  render() {
    return (
      <div className="multiple-upload">
        <DropZone onDrop={this.handleDrop.bind(this)} />
        <div className="files">
          {this.state.files.map((file, index) => (
            <div className="file-thumbnail">
              <a onClick={this.handleRemove.bind(this, index)}><i className="fa fa-remove" /></a>
              <img src={file.preview} />
            </div>
          ))}
          </div>
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
