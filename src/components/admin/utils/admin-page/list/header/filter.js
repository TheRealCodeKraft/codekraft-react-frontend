import React from "react"

class Filter extends React.Component {

	render() {
		return (
			<div className="admin-list-filter-container">
				<span className="filter-identifier">{this.props.filter.label || this.props.attribute.label}</span>
				{ this._buildComponent() }
			</div>
		)
	}

	_buildComponent = () => {
		var component = <input type={this.props.filter.type} onChange={this._handleChange} />
		switch(this.props.filter.type) {
			case "select":
				console.log(this.props.filter.values)
				component = <select onChange={this._handleChange}>
											<option value={-1}>{this.props.filter.placeholder}</option>
											{this.props.filter.values.map(v => (
												<option value={v[this.props.filter.key]}>{v[this.props.filter.value]}</option>
											))}
										</select>
		}
		return component
	}

	_handleChange = (e) => {
		this.props.onChange(this.props.filter, e.target.value)
	}

}

export default Filter
