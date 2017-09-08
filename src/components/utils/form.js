import React from "react"
import { connect } from 'react-redux';

var moment = require("moment")

import Switch from 'react-bootstrap-switch'
import DatePicker from 'react-datetime'
import ListSelector from './form/list-selector'
import FileInput from "react-file-input"

class Form extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      errors: {},
      submitting: false,
      submitError: undefined,
      submitClass:{},
      values: {},
      loadingData: [],
      loadedData: {},
      uploading: {}
    }

    this.handleCancelButton = this.handleCancelButton.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleFormSubmitted = this.handleFormSubmitted.bind(this)
  }

  componentWillMount() {
    var field=undefined, loadingData=[]
    for (var index in this.props.fields) {
      field = this.props.fields[index]
      if (field.values && field.values.targetState !== undefined) {
        this.props.clients[field.values.client][field.values.func]()
        loadingData.push(field)
      }
    }

    if (loadingData.length > 0) {
      this.setState({loadingData: loadingData})
    } else {
      this.loadValuesState()
    }
  
    var self = this
     window.onbeforeunload = function() {
      if (self.state.uploading) {
        var uploading = false;
        for (var index in self.state.uploading) {
          if (self.state.uploading[index] === true) {
            uploading = true;
          }
        }
        if (uploading) {
          return "Un upload de fichier est en cours. Êtes-vous sûr de vouloir quitter cette fenêtre ?";
        }
      }
    }
  }

  componentWillReceiveProps(props) {
    if (this.state.loadingData.length > 0) {
      var loadingData = [], loadedData = this.state.loadedData
      var current = undefined
      for (var index in this.state.loadingData) {
        current = this.state.loadingData[index]
        if (props.reduxState[current.values.targetState][current.values.targetValue]) {
          loadedData[current.name] = props.reduxState[current.values.targetState][current.values.targetValue]
        } else {
          loadingData.push(current)
        } 
      }
      this.setState({loadingData: loadingData, loadedData: loadedData}, function() {
        if (this.state.loadingData.length === 0) {
          this.loadValuesState()
        }
      })
    }
  }

  loadValuesState() {
    var valuesState = {}
    var currentValue = undefined

    for (var index in this.props.fields) {
      if (this.props.values) {
        currentValue = this.props.values[this.props.fields[index].name]
        if (currentValue instanceof Array) {
          currentValue = currentValue.map(value => { return value.id })
        }
      } else {
        currentValue = this.props.fields[index].defaultValue
      }

      valuesState[this.props.fields[index].name] = currentValue
    }

    this.setState({values: valuesState});
  }

  render() {
    var submitButton = this.state.submitting
                       ? <div className="loader-dots"></div>
                       : [<button type="submit" className={this.props.submitClass}>{this.props.submitLabel ? this.props.submitLabel : "Enregistrer"}</button>,
                         this.props.cancelButton === true ? <button className={this.props.submitClass} onClick={this.handleCancelButton}>Ignorer</button> : null]

    return (
      <div className="form-container">
        {this.props.entityId ? this.buildImageUploaders() : null}
        <form id={this.props.id} onSubmit={this.handleFormSubmit}>
          {this.props.fields.map(field => {
            if (field.show === false) { return null }
            if (field.type === "image-uploader") { return null }
 
            if (field.displayIf && this.state.values[field.displayIf.name] !== field.displayIf.value) {
              return null
            }

            return this.getInputs(field)
          })}
          {(this.state.submitError) ? [<span>{this.state.submitError}</span>/*, <br />*/] : null}
          {this.props.submitLabel !== "none"
           ? submitButton
           : null
          }
        </form>
      </div>
    )
  }

  buildImageUploaders() {
    return this.props.fields.filter(field => { return field.type === "image-uploader" }).map(field => {
      return <form encType='multipart/form-data' className="upload-form">
               {(field.showImage === undefined || field.showImage)
               ? <img src={this.state.values[field.name]} className={"img-rounded"} style={{width: 100}} alt={this.state.values[field.name]} />
               : null}
               {/*<span className="upload-title">{field.label}</span>*/}
               {this.state.uploading[field.name] 
                ? <span className="upload-file">Téléchargement en cours</span>
                : <div className="upload-file">
                    <FileInput name="sheet"
                      accept={field.accept !== undefined ? field.accept : ".png"}
                      placeholder="Cliquer ici pour choisir un fichier"
                      className="form-control"
                      onChange={this.handleFileChange.bind(this, field)} />
                      </div>
               }
             </form>
    })
  }

  handleFileChange(field, e) {
    var file = e.target.files[0]
    var uploading = this.state.uploading
    uploading[field.name] = true
    this.setState({uploading: uploading}, function() {
      this.props.service.client.upload(this.props.entityId, field.name, file, this.handleFileChanged.bind(this, field))
    })
  }

  handleFileChanged(field) {
    var uploading = this.state.uploading
    uploading[field.name] = false
    this.setState({uploading: uploading})
  }

  getInputs(field) {
    var inputs = null
    if (field.type === "component") {
      /*
      inputs = []

      if (field.multiple) {
        var occurences = field.occurences
        if (occurences.indexOf("/") !== -1) {
          var splitted = occurences.split("/")
          var dividing = parseInt(splitted[0])
          var key = splitted[1].replace(' ', '')
          occurences = dividing / this.state.values[key]
        } else {
          occurences = this.state.values[field.occurences]
        }

        var input = null
        for (var i=0; i < occurences; i++) {
          input = []
          for (var j in field.components) {
            field.components[j].name = field.name + "[" + i + "][" + field.components[j].name + "]"
            field.components[j].parent = field
            input.push(this.getInput(field.components[j]))
          }
          input = <div className={field.name}>{input}</div>
          inputs.push(input)
        }
      } else {
        var input = []
        for (var i in field.components) {
          input.push(this.getInput(field.components[i]))
        }
        input = <div className={field.name}>{input}</div>
        inputs.push(input)
      }
      */
/*
      inputs = []
      for (var i=0; i < occurences; i++) {
        for (var component in field.components) {
        inputs.push(this.getInput(
        }
      }
*/
    } else {
      inputs = this.getInput(field)
    }
    return inputs
  }

  getInput(field) {
    var input = null, value = this.state.values[field.name], options = []

    if (field.name.indexOf('[') !== -1) {
      var splitted = field.name.split('[')
      value = this.state.values[splitted[0]][splitted[1].replace(']', '')][splitted[2].replace(']','')]
    }

    switch(field.type) {
      case "checkbox":
        input = <input className={field.inputClass} title={field.title} name={field.name} type={field.type} value={value === true ? "on" : "off"} placeholder={field.placeholder} onChange={this.handleInputChange.bind(this, field)} />
        break
      case "radio":
        var radios = []
        if (field.values) {
          var val = undefined
          var radioId = undefined
          for (var index in field.values) {
            val = field.values[index]
            radioId = this.props.id + "-" + field.name + "-" + index
            radios.push(<input key={radioId} id={radioId} title={field.title} name={field.name} type={field.type} value={val.value} onChange={this.handleInputChange.bind(this, field)} checked={value === val.value ? "checked" : ""} />)
            radios.push(<label key={radioId + "_label"} htmlFor={radioId}>{val.label}</label>)
          }
        }
        input = radios
        break
      case "switch":
        input = <Switch title={field.title} name={field.name} onChange={this.handleInputChange.bind(this, field, !this.state.values[field.name])} onText="OUI" offText="NON" defaultValue={value} bsSize="mini" />
        break
      case "select":
        if (field.values instanceof Array) {
          options = field.values
        } else if (field.values instanceof Object) {
          options = this.state.loadedData[field.name] || []
        }
        input = <select className="form-control" title={field.title} name={field.name} onChange={this.handleInputChange.bind(this, field)} defaultValue={value}>
                  {field.placeholder ? <option value="-1">{field.placeholder}</option> : null}
                  {options.map(val => {
                    var properties = {}
                    if (val[field.key] === value) {
                      properties.selected = "selected"
                    }
                    return <option value={val[field.key]} {...properties}>{val[field.value]}</option>
                  })}
                </select>
        break
      case "list-selector":
        if (field.values instanceof Array) {
          options = field.values
        } else if (field.values instanceof Object) {
          options = this.state.loadedData[field.name] || []
        }
        input = <ListSelector className="form-control" field={field} defaultValue={value} options={options} tags={field.tags ? field.tags : false} onChange={this.handleInputChange.bind(this, field)} />
        break
      case "textarea":
        if (value == null) value = ""
        input = <textarea className="form-control" title={field.title} name={field.name} value={value} placeholder={field.placeholder} onChange={this.handleInputChange.bind(this, field)} rows={5} />
        break
      case "date":
        if (!value) value=""
        else if (value !== "") {
          value=moment(value).format("DD/MM/YYYY")
        }
        input = <DatePicker value={value} 
                            dateFormat="DD/MM/YYYY"
                            onChange={this.handleInputChange.bind(this, field)}
                />
        break
      default:
        if (value == null) value = ""
        input = <input className="form-control" title={field.title} name={field.name} type={field.type} value={value} placeholder={field.placeholder} onChange={this.handleInputChange.bind(this, field)} />
        break
    }

    return this.decorateInput(input, field)
  }

  decorateInput(input, field) {
    input = <div className="form-group" key={this.props.id + "-field-" + field.name}>
              {
                field.label !== undefined
                ? <label className="control-label" for={field.name}>{field.label}</label> 
                : null
              }
              {input}
              {
                this.state.errors[field.name] !== undefined
                ? <span>{this.state.errors[field.name]}</span>
                : null
              }
            </div>

    return input 
  }

  handleInputChange(field, e) {
    var values = this.state.values;
    var value = e.target ? e.target.value : e
    if (field.name.indexOf("[") !== -1) {
      var splitted = field.name.split("[")
      var parentFieldName = splitted[0]
      var index = splitted[1].replace(']', '')
      var fieldName = splitted[2].replace(']', '')
      values[parentFieldName][index][fieldName] = value
    } else {
      values[field.name] = value
    }

    switch(field.type) {
      case "checkbox":
        values[field.name] = (value === "on" ? false : true)
        break
      case "radio":
        values[field.name] = (value === "true" ? true : false)
        break
      case "list-selector":
        values[field.name] = value
        break
      default:
        break
    }
    this.setState({values: values});
  }

  handleCancelButton() {
    if (this.props.onCancel) this.props.onCancel()
  }

  handleFormSubmit(e) {
    e.preventDefault();

    var errors = this.validate()
    this.setState({errors: errors})
    if (Object.keys(errors).length === 0) {
      var currentValues = {}

      for (var fIndex in this.props.fields) {
        if (this.props.fields[fIndex].type !== "image-uploader" && this.props.fields[fIndex].show !== false) {
          currentValues[this.props.fields[fIndex].name] = this.state.values[this.props.fields[fIndex].name]
        }
      }
      if (this.props.service !== undefined) {
        this.setState({submitting: true, submitError: undefined}, function() {
          if (this.props.entityId !== undefined) {
            this.props.service.client[this.props.service.func](this.props.entityId, currentValues, this.handleFormSubmitted)
          } else {
            this.props.service.client[this.props.service.func](currentValues, this.handleFormSubmitted)
          }
        })
      }
      if (this.props.onSubmit) this.props.onSubmit(currentValues)
    }
  }

  handleFormSubmitted(data) {
    if (!data.error) {
      this.setState({submitError: undefined, submitting: false})
      if (this.props.onSubmitComplete) this.props.onSubmitComplete(data);
    } else {
      this.setState({submitError: data.message !== undefined ? data.message : data.error, submitting: false})
      if (this.props.onSubmitError) this.props.onSubmitError(data);
    }
  }

  validate() {
    var textTypes = ["text", "password", "email"]
    var field = undefined, errors = {};
    for (var index in this.props.fields) {
      field = this.props.fields[index]
      if (field.required && field.show !== false) {
        if (textTypes.indexOf(field.type) >= 0 && (this.state.values[field.name] === "" || this.state.values[field.name] === undefined)) {
          errors[field.name] = field.name + "_required"
        }
        if (field.type === "select" && (this.state.values[field.name] === -1 || this.state.values[field.name] === "-1")) {
          errors[field.name] = field.name + "_required"
        }
      }

      if (!errors[field.name]) {
        if (field.confirmFor) {
          if (this.state.values[field.name] !== this.state.values[field.confirmFor]) {
            errors[field.name] = field.name + "_does_not_match"
          }
        }
      }

      if (!errors[field.name]) {
        if (field.wanted) {
          if (this.state.values[field.name] !== field.wanted) {
            errors[field.name] = field.name+ "_waiting_for_" + field.wanted
          }
        }
      }
      
    }
    return errors;
  }

}

function mapStateToProps(state) {
  return {
    clients: state.bootstrap.clients,
    reduxState: state
  }
}

export default connect(mapStateToProps)(Form);
