var React = require("react")

import Filters from "./list/header/filters"
import AdminPageListHeader from './list/header'
import AdminPageListRow from './list/row'

class AdminPageList extends React.Component {

	state = {
		selectedRows: []
	}

  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleSee = this.handleSee.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleCustomAction = this.handleCustomAction.bind(this)
  }

  render() {
		let rows = null
		if (this.props.loading) {
			rows = []
			rows.push(
				<div className="admin-list-row">
					<div className="admin-list-cell">
						<div className="loader-dots" />
					</div>
				</div>
			)
		} else if (this.props.items) {
			rows = this.props.items.map((item, index) => (
				<AdminPageListRow
					key={"admin-list-row-" + index}
					index={index}
					item={item}
					bulkable={(typeof this.props.bulkable === "function") ? this.props.bulkable() : this.props.bulkable}
					selected={this.state.selectedRows.find(r => r.id == item.id) !== undefined}
					attributes={this.props.attributes}
					actions={this.props.actions}
					form={this.props.form}
					onDelete={this.handleDelete}
					onSee={this.handleSee}
					onEdit={this.handleEdit}
					onCustomAction={this.handleCustomAction}
					onSelected={this._handleRowSelected}
					config={this.props.config}
				/>
			))
		}

    return (
      <div className="admin-list">
				{ this.props.filters
					? <Filters
							currentFilter={this.props.currentFilter}
							filters={this.props.filters}
							category={this.props.filtersCategory}
							savable={this.props.filtersSavable}
							attributes={this.props.attributes}
							onApply={this.props.onApplyFilters}
							onSave={this.props.onSaveFilters}
						/>
					: null
				}
        <AdminPageListHeader 
					bulkable={(typeof this.props.bulkable === "function") ? this.props.bulkable() : this.props.bulkable}
					attributes={this.props.attributes}
					allSelected={this.props.loading || this.props.items.length == this.state.selectedRows.length}
					onSort={this.props.onSort}
					onSelectAll={this._handleSelectAll}
				/>
				<div className="admin-list-body">
	        {rows}
				</div>
      </div>
    )
  }

  handleDelete(id) {
    if (this.props.onDelete) this.props.onDelete(id)
  }

  handleSee(id) {
    if (this.props.onSee) this.props.onSee(id)
  }

  handleEdit(id) {
    if (this.props.onEdit) this.props.onEdit(id)
  }

  handleCustomAction(id, action) {
    if (this.props.onCustomAction) this.props.onCustomAction(id, action)
  }

	_handleRowSelected = (item) => {
		var selectedRows = this.state.selectedRows
		if (selectedRows.find(r => r.id == item.id)) {
			selectedRows.splice(selectedRows.map(r => r.id).indexOf(item.id), 1)
		} else {
			selectedRows.push(item)
		}
		this.setState({selectedRows})
	}

	_handleSelectAll = () => {
		var selectedRows = []
		if (this.state.selectedRows.length !== this.props.items.length) {
			selectedRows = JSON.parse(JSON.stringify(this.props.items))
		}
		this.setState({selectedRows})
	}

	getSelectedRows = () => {
		return this.state.selectedRows
	}

}

export default AdminPageList
