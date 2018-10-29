var React = require("react")

import Filters from "./list/header/filters"
import AdminPageListHeader from './list/header'
import AdminPageListRow from './list/row'

class AdminPageList extends React.Component {

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
					bulkable={this.props.bulkable}
					attributes={this.props.attributes}
					actions={this.props.actions}
					form={this.props.form}
					onDelete={this.handleDelete}
					onSee={this.handleSee}
					onEdit={this.handleEdit}
					onCustomAction={this.handleCustomAction}
					config={this.props.config}
				/>
			))
		}

    return (
      <div className="admin-list">
				{ this.props.filters
					? <Filters
							filters={this.props.filters}
							attributes={this.props.attributes}
							onApply={this.props.onApplyFilters}
						/>
					: null
				}
        <AdminPageListHeader 
					bulkable={this.props.bulkable}
					attributes={this.props.attributes} 
					onSort={this.props.onSort}
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

}

export default AdminPageList
