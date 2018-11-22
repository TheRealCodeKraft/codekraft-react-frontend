import React from "react"

import View from "./export-v"

import { clone } from 'lodash'

var FileSaver = require('filesaver.js-npm');

class Export extends React.Component {

	state = {
		attributes: []
	}

	componentWillMount = () => {
		this.setState({attributes: clone(this.props.attributes)})
	}

	componentWillReceiveProps = (props) => {
		this.setState({attributes: clone(props.attributes)})
	}

	render() {
		return (
			<View
				items={this.props.items}
				csv={this._buildCsv()}
				attributes={this.props.attributes}
				selectedAttributes={this.state.attributes}
				onCheck={this._handleCheck}
				onDownload={this._handleDownload}
			/>
		)
	}

	_handleCheck = (attr) => {
		var attributes = this.state.attributes
		var index = attributes.map(a => a.name).indexOf(attr.name)
		if (index !== -1) {
			attributes.splice(index, 1)
		} else {
			attributes.push(attr)
		}

		attributes.sort((attr1, attr2) => {
			return (this.props.attributes.map(a => a.name).indexOf(attr1.name) > this.props.attributes.map(a => a.name).indexOf(attr2.name)) ? 1 : -1
		})
		this.setState({attributes})
	}

	_buildCsv = () => {
		const header = this.state.attributes.map(attr => attr.name).join(';') + '\n'
		const values = this.props.items.map(item => (
			this.state.attributes.map(attr => (
				attr.csvWrapper
					? attr.csvWrapper(item[attr.name])
					: attr.wrapper 
						? attr.wrapper(item[attr.name]) 
						: item[attr.name]
			)).join(";")
		)).join('\n')

		return `${header}${values}`
	}

	_handleDownload = () => {
    FileSaver.saveAs(new Blob([this._buildCsv()], {type: "csv"}), "export.csv");
	}

}

export default Export
