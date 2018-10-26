import React from "react"

class Filter extends React.Component {

	render() {
		return (
			<div className="admin-list-filter-container">
				<span className="filter-identifier">{this.props.filter.label || this.props.attribute.label}</span>
				<input type="text" onChange={this._handleChange} />
			</div>
		)
	}

	_handleChange = (e) => {
		this.props.onChange(this.props.filter.name, e.target.value)
	}

}

export default Filter
