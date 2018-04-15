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
        { (this.props.showZone == undefined || this.props.showZone === true) && (this.props.mode !== "single" || !this.state.files || this.state.files.length == 0)
          ? <DropZone 
              onDrop={this.handleDrop.bind(this)}
              className="multiple-upload-zone"
              activeClassName="active-zone"
            >
							{ this.props.dropComponent
								? this.props.dropComponent
              	: [	<span>Déposez des fichiers ici</span>,
              			<span>ou cliquez pour sélectionner des fichiers</span>
									]
							}
            </DropZone>
          : null}
				{ this.props.mode !== "single"
					? <h6 className="selected-title">Fichier{this.props.mode == "single" ? "": "s"} sélectionné{this.props.mode == "single" ? "" : "s"}</h6>
					: null
				}
				{ this.props.mode == "single"
					? !(this.state.files instanceof Array)
						? <div className="single-file">
								{this.state.files.name} [<a onClick={this.reset.bind(this)}>modifier</a>]
							</div>
						: null
        	: <div className="files">
							{ this.state.files.length
								?	this.state.files.map((file, index) => (
										<div className="file-thumbnail">
											<a onClick={this.handleRemove.bind(this, index)}>
												{ this.props.removeIcon
													? this.props.removeIcon
													: <i className="fa fa-remove" />
												}
											</a>
											<img src={file.preview ? file.preview : file.file_url} />
										</div>
									))
								: <span className="no-files">Aucun fichier</span>
							}
        		</div>
				}
      </div>
    )
  }

  handleDrop(acceptedFiles, rejectedFiles) {
    var files = this.state.files

		if (this.props.mode == "single") {
			console.log(acceptedFiles[0])
			files = acceptedFiles[0]
		} else {
			for (var i in acceptedFiles) {
				files.push(acceptedFiles[i])
			}
		}

    this.setState({files}, () => {
      this.props.onChange(this.state.files)
    })
  }

	reset(e) {
		if (e) e.preventDefault()
		this.setState({files: []}, () => {
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
