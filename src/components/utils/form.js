var React = require("react")
import { connect } from 'react-redux';

var m = require("moment")
const moment = m.parseZone

import Switch from 'react-bootstrap-switch'
import DatePicker from 'react-datetime'
import ListSelector from './form/list-selector'
import Wysiwyg from './form/wysiwyg'
import FileInput from "react-file-input"
import MultipleUpload from './form/multiple-upload'
import DateHourPicker from './form/date-hour-picker'
import Slider, { Range } from 'rc-slider'
import { SketchPicker } from 'react-color'

import {stateToHTML} from 'draft-js-export-html'
import {convertToRaw, convertFromRaw} from 'draft-js';

import Loader from "react-loaders"

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
		var field=undefined, loadingData=[], loadedData=[]
		for (var index in this.props.fields) {
			field = this.props.fields[index]
			if (field.values && field.values.targetState !== undefined) {
				// Hook to reload data if paginated data already loaded
				if (this.props.reduxState[field.values.targetState][field.values.targetValue] && !this.props.reduxState[field.values.targetState][field.values.targetValue].pagination) {
					loadedData[field.name] = this.props.reduxState[field.values.targetState][field.values.targetValue]
				} else {
					this.props.clients[field.values.client][field.values.func](field.values.func == "fetchAll" ? {all: true} : {}, null, field.values.offline || false)
					loadingData.push(field)
				}
			}
		}

		if (loadingData.length > 0) {
			this.setState({loadingData: loadingData, loadedData: loadedData})
		} else {
			if (this.props.onLoaded) this.props.onLoaded()
			this.setState({loadedData: loadedData}, function() {
				this.loadValuesState()
			})
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
				if (props.reduxState[current.values.targetState][current.values.targetValue] && !props.reduxState[current.values.targetState][current.values.targetValue].pagination) {
					loadedData[current.name] = props.reduxState[current.values.targetState][current.values.targetValue]
				} else {
					loadingData.push(current)
				}
			}
			if (loadingData.length === 0) {
				if (this.props.onLoaded) this.props.onLoaded()
			}
			this.setState({loadingData: loadingData, loadedData: loadedData}, function() {
				if (this.state.loadingData.length === 0) {
					this.loadValuesState()
				}
			})
		} else if (this.props.entityId !== props.entityId || props.forceReload) {
			this.loadValuesState(props)
		}
	}

	loadValuesState(props=undefined) {
		if (!props) props = this.props
		var valuesState = {}
		var currentValue = undefined, currentHtmlValue = undefined

		for (var index in props.fields) {
			if (props.values) {
				if (props.fields[index].name.indexOf("[") !== -1) {
					var splitted = props.fields[index].name.split('[')
					if (props.values[splitted[0]]) {
						if (splitted.length === 2) {
							currentValue = props.values[splitted[0]][splitted[1].replace(']', '')]
						} else {
							currentValue = props.values[splitted[0]][splitted[1].replace(']', '')][splitted[2].replace(']', '')]
						}
					} else {
						currentValue = undefined
					}
				} else if (props.fields[index].type == "wysiwyg") {
					currentValue = props.values[props.fields[index].name + "_raw"]
					if (currentValue && !(currentValue instanceof Object) && !(currentValue == "")) {
						currentValue = JSON.parse(currentValue)
					}
					currentHtmlValue = props.values[props.fields[index].name + "_html"]
				} else {
					currentValue = props.values[props.fields[index].name]
				}
				if (currentValue instanceof Array && !props.fields[index].component && props.fields[index].type !== "multiple-upload") {
					currentValue = currentValue.map(value => { return value.id })
				}
			} else {
				currentValue = props.fields[index].defaultValue
			}

			if (props.fields[index].type == "checkbox" && !currentValue) {
				currentValue = false
			}

			if (props.fields[index].type == "wysiwyg") {
				valuesState[props.fields[index].name + "_raw"] = currentValue
				valuesState[props.fields[index].name + "_html"] = currentHtmlValue
			} else {
				valuesState[props.fields[index].name] = currentValue
			}
		}

		this.setState({values: valuesState});
	}

	render() {
		const wrapper = this.props.wrapper || function(children) { return children }
		var submitButton = this.state.submitting
		? <div className="loader-dots"></div>
		: (this.props.hideSubmit !== true
			? [<button key={`${this.props.id}-button`} type="submit" className={this.props.submitClass}>{this.props.submitLabel !== undefined ? this.props.submitLabel : "Enregistrer"}</button>,
			this.props.cancelButton === true ? <button key={`${this.props.id}-cancel`} className={this.props.cancelClass || this.props.submitClass} onClick={this.handleCancelButton}>{this.props.cancelLabel || "Ignorer"}</button> : null]
			: null)

			return (
				<div className={"form-container " + (this.props.className ? this.props.className : "")}>
				{this.props.entityId ? this.buildImageUploaders() : null}
				<form encType='multipart/form-data' id={this.props.id} onSubmit={this.handleFormSubmit} className={this.props.className}>
				{wrapper(this.props.fields.map(field => {
					if (field.show === false) { return null }
					if (field.type === "image-uploader") { return null }

					if (field.displayIf && this.state.values[field.displayIf.name] !== field.displayIf.value) {
						return null
					}

					return this.getInputs(field)
				}))}
				{(this.state.submitError) ? [<span>{this.state.submitError}</span>, <br />] : null}
				{this.props.submitLabel !== "none"
				? <div className="submit-container">{submitButton}</div>
				: null
			}
			{this.props.children}
			</form>
			{this.state.loadingData.length > 0 ? <div className="form-loader">{this.props.loadingComponent ? <this.props.loadingComponent /> : <Loader type="ball-pulse" />}</div> : null}
			</div>
		)
	}

	buildImageUploaders() {
		return this.props.fields.filter(field => { return field.type === "image-uploader" }).map(field => {
		return <form key={`${this.props.id}-${field.name}-image-uploader`} encType='multipart/form-data' className="upload-form">
		{ field.label 
			? <span>{field.label}</span>
			: null
		}
		{(field.showImage === undefined || field.showImage)
			? <img src={this.state.values[field.name]} className={"img-rounded"} style={{width: 100}} alt={this.state.values[field.name]} />
			: null}
		{	field.showFileName && field.fileNameKey
		 	? <span>{this.state.values[field.fileNameKey] ? this.state.values[field.fileNameKey] : "Aucun fichier"}</span>
			: null
		}
			{/*<span className="upload-title">{field.label}</span>*/}
			{this.state.uploading[field.name]
				? <span className="upload-file-name" className="uploading-file">Téléchargement en cours</span>
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

	handleFileChanged(field, data) {
		var uploading = this.state.uploading
		uploading[field.name] = false
		this.setState({uploading: uploading}, function() {
			if (this.props.onUploadFinished) this.props.onUploadFinished(field, data)
		})
	}

	getInputs(field) {
		var inputs = null
		if (field.type === "component") {
			// inputs = []
			//
			// if (field.multiple) {
			// 	var occurences = field.occurences
			// 	if (occurences.indexOf("/") !== -1) {
			// 		var splitted = occurences.split("/")
			// 		var dividing = parseInt(splitted[0])
			// 		var key = splitted[1].replace(' ', '')
			// 		occurences = dividing / this.state.values[key]
			// 	} else {
			// 		occurences = this.state.values[field.occurences]
			// 	}
			//
			// 	var input = null
			// 	for (var i=0; i < occurences; i++) {
			// 		input = []
			// 		for (var j in field.components) {
			// 			field.components[j].name = field.name + "[" + i + "][" + field.components[j].name + "]"
			// 			field.components[j].parent = field
			// 			input.push(this.getInput(field.components[j]))
			// 		}
			// 		input = <div className={field.name}>{input}</div>
			// 		inputs.push(input)
			// 	}
			// } else {
			// 	var input = []
			// 	for (var i in field.components) {
			// 		input.push(this.getInput(field.components[i]))
			// 	}
			// 	input = <div className={field.name}>{input}</div>
			// 	inputs.push(input)
			// }
			// inputs = []
			// for (var i=0; i < occurences; i++) {
			// 	for (var component in field.components) {
			// 		inputs.push(this.getInput())
			// 	}
			// }
		} else {
			inputs = this.getInput(field)
		}

		return inputs
	}

	getInput(field) {
		var input = null, value = this.state.values[field.name], options = []
		var fieldName = field.name

		switch(field.type) {
			case "checkbox":
				input = <input key={`${this.props.id}-checkbox-${fieldName}`} id={field.name} className={field.inputClass} title={field.title} name={fieldName} type={field.type} defaultChecked={value} placeholder={field.placeholder} onChange={this.handleInputChange.bind(this, field)} />
				break
			case "radio":
				var radios = []
				if (field.values) {
					var val = undefined
					var radioId = undefined
					for (var index in field.values) {
						val = field.values[index]
						radioId = this.props.id + "-" + field.name + "-" + index
						radios.push(<input key={radioId} id={radioId} title={field.title} name={fieldName} type={field.type} value={val.value} onChange={this.handleInputChange.bind(this, field)} checked={value === val.value ? "checked" : ""} />)
						radios.push(<label key={`${radioId}_label`} htmlFor={radioId}>{val.label}</label>)
					}
				}
				input = radios
				break
			case "switch":
				input = <Switch title={field.title} name={fieldName} onChange={this.handleInputChange.bind(this, field, !this.state.values[field.name])} onText="OUI" offText="NON" value={value} defaultValue={field.defaultValue} bsSize="mini" />
				break
			case "slider":
				input = field.range
				? <Range onChange={this.handleInputChange.bind(this, field)} />
				: <Slider step={field.step} onChange={this.handleInputChange.bind(this, field)} value={this.state.values[field.name]} />
				if (field.subComponent) {
					input = <div key={`${this.props.id}-slider-${fieldName}`} className="slider-with-component">
					{input}
					<field.subComponent value={this.state.values[field.name]} />
					</div>
				}
				break
			case "select":
				if (field.values instanceof Array) {
					options = field.values
				} else if (field.values instanceof Object) {
					options = this.state.loadedData[field.name] || []
				}

				if (field.dependant) {
					options = options.filter(o => o[field.dependant] == this.state.values[field.dependant])
				}

				input = <select key={`${this.props.id}-select-${fieldName}`} className="form-control" title={field.title} name={fieldName} onChange={this.handleInputChange.bind(this, field)} value={value || ''}>
				{field.placeholder ? <option value="-1">{field.placeholder}</option> : null}
				{options.map((val, index) => {
					return <option key={`select-option-for-${field.name}-${index}`} value={val[field.key]}>{val[field.value]}</option>
				})}
				</select>
				break
			case "list-selector":
				if (field.values instanceof Array) {
					options = field.values
				} else if (field.values instanceof Object) {
					options = this.state.loadedData[field.name] || []
				}
				input = <ListSelector key={`${this.props.id}-list-selector-${field.name}`} className="form-control" field={field} defaultValue={value} options={options} tags={field.tags ? field.tags : false} onChange={this.handleInputChange.bind(this, field)} />
				break
			case "textarea":
				if (value == null) value = ""
				input = <textarea key={`${this.props.id}-textarea-${field.name}`} className="form-control" title={field.title} name={fieldName} value={value} placeholder={field.placeholder} onChange={this.handleInputChange.bind(this, field)} rows={5} />
				break
			case "wysiwyg":
				input = <Wysiwyg key={`${this.props.id}-wysiwyg-${field.name}`} value={this.state.values[field.name + "_raw"]} toolbar={field.toolbar} onChange={this.handleInputChange.bind(this, field)} mentions={field.mentions} emoji={field.emoji} />
				break
			case "date":
				if (!value) value=""
				else if (value !== "") {
					value=moment(value).format("DD/MM/YYYY")
				}
				input = <DatePicker key={`${this.props.id}-date-${field.name}`}
				value={value}
				dateFormat="DD/MM/YYYY"
				onChange={this.handleInputChange.bind(this, field)}
				/>
				break
			case "datehour":
				if (!value) value=""
				else if (value !== "") {
					value=moment(value)//.format("DD/MM/YYYY HH:mm")
				}
				input = <DateHourPicker key={`${this.props.id}-date-hour-${field.name}`}
				value={value}
				onlyHours={field.onlyHours}
				onChange={this.handleInputChange.bind(this, field)}
				/>
				break
			case "color":
				input = <SketchPicker color={value} onChangeComplete={this.handleInputChange.bind(this, field)} />
				break
			case "multiple-upload":
				input = <MultipleUpload key={`${this.props.id}-multiple-upload-${field.name}`} onChange={this.handleInputChange.bind(this, field)} showZone={field.showZone} value={value} removeIcon={field.removeIcon} dropComponent={field.dropComponent} mode={field.mode} />
				break
			default:
				if (value == null) value = ""
				if (field.component) {
					input = <field.component key={`${this.props.id}-{field.component.name}-{field.name}`} className="form-control" field={field} name={fieldName} value={value} entity={this.state.values} onChange={this.handleInputChange.bind(this, field)} />
				} else {
					input = <input key={`${this.props.id}-input-default-${fieldName}`} className="form-control" title={field.title} name={fieldName} id={fieldName} type={field.type} value={value} placeholder={field.placeholder} onChange={this.handleInputChange.bind(this, field)} />
				}
				break
		}

		return this.decorateInput(input, field)
	}

	decorateInput(input, field) {
		var wrapper = (children) => ( <div className="form-group" key={`${this.props.id}-field-${field.name}`} style={field.inlineStyle}>{children}</div> )
		if (field.wrapper) {
			wrapper = (children) => {
				return field.wrapper(children, field, this)
			}
		} else if (this.props.fieldWrapper) {
			wrapper = (children) => {
				return this.props.fieldWrapper(children, field, this)
			}
		}
		input = wrapper([
			(field.label !== undefined && field.type !== "checkbox" && this.props.labels !== "off" && field.type !== "hidden")
			? <label key={`label-for-${field.name}`} className={`control-label ${field.labelClassName}`} htmlFor={field.name}>{field.label}</label>
			: null,
			input,
			(field.label !== undefined && field.type == "checkbox")
			? <label key={`label-for-${field.name}`} className={`control-label ${field.labelClassName}`} htmlFor={field.name}>{field.label}</label>
			: null,
			this.state.errors[field.name] !== undefined
			? <span key={`error-for-${field.name}`} className="form-error">{this.state.errors[field.name].includes("_required") ? (field.label + " est obligatoire") : this.state.errors[field.name]}</span>
			: null
		])

		return input
	}

	handleInputChange(field, e) {
		if (Object.keys(this.state.values).length > 0) {
			var values = this.state.values;
			var value = e.target ? e.target.value : e
			// if (field.name.indexOf("[") !== -1) {
			// 	var splitted = field.name.split("[")
			// 	var parentFieldName = splitted[0]
			// 	var index = splitted[1].replace(']', '')
			// 	var fieldName = splitted[2].replace(']', '')
			// 	values[parentFieldName][index][fieldName] = value
			// } else {
			// 	values[field.name] = value
			// }

			if (field.type !== "checkbox") {
				values[field.name] = value
			}

			switch(field.type) {
				case "checkbox":
					values[field.name] = !values[field.name]
					break
				case "radio":
					values[field.name] = (value === "true" ? true : false)
					break
				case "list-selector":
					values[field.name] = value
					break
				case "color":
					values[field.name] = value.hex
					break
				case "wysiwyg":
					values[field.name + "_raw"] = convertToRaw(value)
					values[field.name + "_html"] = stateToHTML(value)
					break
			}

			this.setState({values}, () => {
				if (this.props.onInputChange) this.props.onInputChange(values)
			})
		}
	}

	handleCancelButton() {
		if (this.props.onCancel) this.props.onCancel()
	}

	handleFormSubmit(e) {
		e.preventDefault()
		this.submit()
	}

	submit(extraData={}, callback) {
		var errors = this.validate()
		this.setState({errors: errors})
		if (Object.keys(errors).length === 0) {
			var currentValues = extraData

			for (var fIndex in this.props.fields) {
				if (this.props.fields[fIndex].type !== "image-uploader" && this.props.fields[fIndex].show !== false) {
					if (this.props.fields[fIndex].name.indexOf('[') !== -1) {
						var splitted = this.props.fields[fIndex].name.split("[")
						if (splitted.length === 2) {
							if (!currentValues[splitted[0]]) {
								currentValues[splitted[0]] = {}
							}
							currentValues[splitted[0]][splitted[1].replace(']', '')] = this.state.values[this.props.fields[fIndex].name]
						} else {
							if (!currentValues[splitted[0]]) {
								currentValues[splitted[0]] = {}
							}
							if (!currentValues[splitted[0]][splitted[2]]) {
								currentValues[splitted[0]][splitted[1].replace(']', '')] = {}
							}
							currentValues[splitted[0]][splitted[1]][splitted[2].replace(']', '')] = this.state.values[this.props.fields[fIndex].name]
						}
					} else {
						if (this.props.fields[fIndex].type == "wysiwyg") {
							currentValues[this.props.fields[fIndex].name + "_raw"] = this.state.values[this.props.fields[fIndex].name + "_raw"]
							currentValues[this.props.fields[fIndex].name + "_html"] = this.state.values[this.props.fields[fIndex].name + "_html"]
						} else {
							if (this.props.fields[fIndex].type == "datehour") {
								currentValues[this.props.fields[fIndex].name] = moment(this.state.values[this.props.fields[fIndex].name]).format("DD/MM/YYYY HH:mm")
							} else {
								if (this.props.fields[fIndex].type == "date") {
									currentValues[this.props.fields[fIndex].name] = moment(this.state.values[this.props.fields[fIndex].name]).format("DD/MM/YYYY") + " 00:00"
								} else {
									currentValues[this.props.fields[fIndex].name] = this.state.values[this.props.fields[fIndex].name]
								}
							}
						}
					}
				}
			}
			if (this.props.service !== undefined) {
				this.setState({submitting: true, submitError: undefined}, function() {
					if (this.props.entityId !== undefined) {
						this.props.service.client[this.props.service.func](this.props.entityId, currentValues, this.handleFormSubmitted)
					} else {
						this.props.service.client[this.props.service.func](currentValues, this.handleFormSubmitted, this.props.offlineMode)
					}
				})
			}
			if (callback) {
				callback(currentValues)
			} else if (this.props.onSubmit) {
				this.props.onSubmit(currentValues)
			}
		} else {
			this.props.onSubmitError({error: true, message: "Validation failed"})
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
				if (!field.displayIf || (this.state.values[field.displayIf["name"]] == field.displayIf["value"])) {
					if (textTypes.indexOf(field.type) >= 0 && (this.state.values[field.name] === "" || this.state.values[field.name] === undefined)) {
						errors[field.name] = field.name + "_required"
					}
					if (field.type === "select" && (this.state.values[field.name] === -1 || this.state.values[field.name] === "-1")) {
						errors[field.name] = field.name + "_required"
					}
					if (field.type === "wysiwyg") { //&& this.state.values[field.name + "_html"] === undefined) {
						if (!this.state.values[field.name + "_raw"] || !convertFromRaw(this.state.values[field.name + "_raw"]).hasText()) {
							errors[field.name] = field.name + "_required"
						}
					}
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

	getValue(fieldName) {
		return this.state.values[fieldName]
	}

	getValues = () => {
		return this.state.values
	}

	getLoadedData = () => {
		return this.state.loadedData
	}

	reset() {
		var newValues = {}
		for (var key in this.props.fields) {
			if (this.props.fields[key].type == "wysiwyg") {
				newValues[this.props.fields[key].name + "_raw"] = "RESET"
			} else if (this.props.fields[key].type == "multiple-upload") {
				newValues[this.props.fields[key].name] = "RESET"
			} else if (this.props.fields[key].defaultValue) {
				newValues[this.props.fields[key].name] = this.props.fields[key].defaultValue
			}
		}
		this.setState({values: newValues})
	}
}

function mapStateToProps(state) {
	return {
		clients: state.bootstrap.clients,
		reduxState: state
	}
}

export default connect(mapStateToProps, null, null, { withRef: true })(Form);
