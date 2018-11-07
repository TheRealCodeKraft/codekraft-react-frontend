import React from "react"

import Filter from "./filter"

class Filters extends React.Component {

	state = {

	}

	render() {
		return (
			<div className="admin-list-header-filters">
				{ this.props.filters.map(filter => {
					filter = (filter instanceof Object ? filter : {name: filter})
					return (
						<Filter
							attribute={this.props.attributes.find(a => a.name == filter.name)}
							filter={filter}
							onChange={this._handleChange}
						/>
						)
				})}
				<button onClick={this._handleFilter}>Apply</button>
			</div>

		)
	}

	_handleChange = (filter, value) => {
		var state = this.state
		var target = filter.name
		console.log(target + " : " + value)
		if (value == "" || !value || value == "off" || value == -1) {
			if (state[target]) {
				delete state[target]
			}
		} else {
			if (filter.type == "checkbox") {
				if (state[target]) {
					delete state[target]
				} else {
					state[target] = true
				}
			} else {
				state[target] = value
			}
		}
		this.setState(state)
	}

	_handleFilter = () => {
		this.props.onApply(this.state)
	}
}

export default Filters
