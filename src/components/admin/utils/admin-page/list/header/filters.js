import React from "react"

import Filter from "./filter"

class Filters extends React.Component {

	state = {

	}

	render() {
		return (
			<div className="admin-list-header-filters">
				{ this.props.filters.map(filter => (
					<Filter
						attribute={this.props.attributes.find(a => a.name == filter.name)}
						filter={filter}
						onChange={this._handleChange}
					/>
				))}
				<button onClick={this._handleFilter}>Apply</button>
			</div>

		)
	}

	_handleChange = (target, value) => {
		var state = this.state
		if (value == "" || !value) {
			if (state[target]) {
				delete state[target]
			}
		} else {
			state[target] = value
		}
		this.setState(state)
	}

	_handleFilter = () => {
		this.props.onApply(this.state)
	}
}

export default Filters
