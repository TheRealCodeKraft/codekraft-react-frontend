import React from "react"

import Filter from "./filter"

import { connect } from "react-redux"

import { Form } from "codekraft-react-frontend"

class Filters extends React.Component {

	state = {
		open: false,
		filters: {},
		current: null
	}

	componentWillMount = () => {
		if (this.props.savable) {
			this.props.clients.FilterClient.fetchAll({category: this.props.category})
		}
		if (this.props.currentFilter) {
			this.setState({current: this.props.currentFilter})
		}
	}

	componentWillReceiveProps = (props) => {
		if (props.currentFilter) {
			this.setState({current: props.currentFilter})
		}
	}

	render() {
		return (
			<div className="admin-list-header-filters">
				<div className="filters-header">
					<span className="filters-header-title">Filtres</span>
					{ this.props.savable
						? <select onChange={this._handleFilterLoaded} value={this.state.current ? this.state.current.id : "-1"}>
								<option value="-1">Sélectionnez un filtre</option>
								{this.props.availableFilters.map(filter => (
									<option value={filter.id}>{filter.name}</option>
								))}
							</select>
						: null
					}
					<a href="javascript:void(0)" onClick={this._handleToggleFilters}>Toggle</a>
				</div>
				<div className={`filters-content ${this.state.open ? "open" : ""}`}>
					<Form
						ref="form"
						fields={this.props.filters}
						forceReload={true}
						values={this.state.filters}
						hideSubmit={true}
					/>
					<button onClick={this._handleFilter}>Appliquer</button>
					{ this.props.savable
						? <button onClick={this._handleSave}>Enregistrer</button>
						: null
					}
				</div>
			</div>

		)
	}

	_handleFilter = () => {
		this.refs.form.getWrappedInstance().submit({}, (filters) => {
			this.setState({filters: this._clean(filters)}, () => {
				this.props.onApply(this.state.filters)
			})
		})
	}

	_handleSave = () => {
		if (this.props.onSave) {
			this.refs.form.getWrappedInstance().submit({}, (filters) => {
				filters = this._clean(filters)
				this.props.onSave(filters, this._getFilterLabels(filters), this.state.current)
			})	
		}
	}

	_getFilterLabels = (filters) => {
		var labels = {}, attr
		Object.keys(filters).forEach(key => {
			if (filters[key] instanceof Object) {
				Object.keys(filters[key]).forEach(subkey => {
					attr = this.props.filters.find(f => f.name == `${key}[${subkey}]`)
					if (attr && attr.values) {
						labels[attr.name] = this.refs.form.getWrappedInstance().getLoadedData()[attr.name].find(v => v[attr.key] == filters[key][subkey])[attr.value]
					}
				})
			} else {
				attr = this.props.filters.find(f => f.name == key)
				if (attr && attr.values) {
					labels[attr.name] = this.refs.form.getWrappedInstance().getLoadedData()[attr.name].find(v => v[attr.key] == filters[key])[attr.value]
				}
			}
		})
		return labels
	}

	_clean = (filters) => {
		var result = {}
		Object.keys(filters).forEach(key => {
			if (filters[key] instanceof Object) {
				result[key] = this._clean(filters[key])
				if (Object.keys(result[key]).length == 0) {
					delete result[key]
				}
			} else if (filters[key] !== undefined && filters[key] !== null && filters[key] !== -1 && filters[key] !== "" && filters[key] !== false && filters[key] !== -1 && filters[key] !== "-1") {
				result[key] = filters[key]
			}
		})
		return result
	}

	_handleFilterLoaded = (e) => {
		var filter = this.props.availableFilters.find(f => f.id == e.target.value)
		this.setState({current: filter, filters: filter ? filter.content : {}, force: guid()}, () => {
			if (filter) {
				this.props.onApply(filter.content)
			}
		})
	}

	_handleToggleFilters = (e) => {
		e.preventDefault()
		this.setState({open: !this.state.open})
	}
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const mapStateToProps = (state) => ({
	clients: state.bootstrap.clients,
	availableFilters: state.filterState.filters || []
})

export default connect(mapStateToProps)(Filters)
