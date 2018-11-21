import React from "react"

import { connect } from "react-redux"

import { Form } from "codekraft-react-frontend"

class FiltersSaver extends React.Component {

	state = {
		current: null
	}

	componentWillMount = () => {
		this.setState({current: this.props.current})
	}

	render() {
		return (
			<div className="filters-saver">
				{ this.state.current
					? <div className="alter-message">Voulez-vous mettre à jour le filtre <strong>{this.state.current.name}</strong> en cours d'utilisation ?</div>
					: null
				}
				<Form
					fields={[
						{
							name: "name",
							label: "Nom du filtre",
							type: this.state.current ? "hidden" : "text"
						},
						{
							name: "category",
							type: "hidden",
						},
						{
							name: "content",
							type: "hidden",
						}
					]}
					entityId={this.state.current ? this.state.current.id : undefined}
					onSubmitComplete={this._handleSubmitComplete}
					onSubmitError={this._handleSubmitError}
					onCancel={this._handleCancel}
					cancelButton={this.state.current !== null}
					submitLabel={this.state.current ? "Oui" : "Enregistrer"}
					cancelLabel={"Non"}
					values={{
						name: this.state.current ? this.state.current.name : "",
						category: this.props.category,
						content: JSON.stringify(this.props.filters)
					}}
					service={{client: this.props.clients.FilterClient, func: this.state.current ? "update" : "create"}}
				/>
				<div className="filters-description">
					{ Object.keys(this.props.filters).map(key => {
							var value
							var attr = this.props.attributes.find(a => a.name == key)
							if (!attr && this.props.filters[key] instanceof Object) {
								return Object.keys(this.props.filters[key]).map(subkey => {
									attr = this.props.attributes.find(a => a.name == `${key}[${subkey}]`)
									value = this.props.filters[key][subkey]
									if (this.props.namedFilters[attr.name]) {
										value = this.props.namedFilters[attr.name]
									}
									return (
										<div className="filter-description">
											<span className="filter-label">{attr.label}</span>
											<span className="filter-value">{value == true ? "OUI" : value}</span>
										</div>
									)
								})
							} else {
								value = this.props.filters[key]
								if (this.props.namedFilters[attr.name]) {
									value = this.props.namedFilters[attr.name]
								}
								return (
									<div className="filter-description">
										{attr.label} {attr.filterViewer ? attr.filterViewer(value) : value}
									</div>
								)
							}
					})}
				</div>
			</div>
		)
	}

	_handleSubmitComplete = (data) => {
		this.props.onSaved(data)
	}

	_handleSubmitError = (error) => {

	}

	_handleCancel = () => {
		this.setState({current: null})
	}

}

const mapStateToProps = (state) => ({
	clients: state.bootstrap.clients
})

export default connect(mapStateToProps)(FiltersSaver)
