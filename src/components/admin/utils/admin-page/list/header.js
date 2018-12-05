var React = require("react")

class AdminPageListHeader extends React.Component {

  render() {
    var header = [], attribute, label = undefined, name = undefined, sortable = true
		if (this.props.bulkable) {
			header.push(<div><input type="checkbox" checked={this.props.allSelected} onChange={this.props.onSelectAll} /></div>)
		}
    for (var attrIndex in this.props.attributes) {
      attribute = this.props.attributes[attrIndex]
      if (attribute instanceof Object) {
        if (attribute.hidden) continue
				name = attribute.name
				sortable = (attribute.sortable !== undefined) ? attribute.sortable : true
        label = attribute.label
      } else {
				label = attribute
			}

      header.push(
				<div key={"header-row-attr-" + attrIndex}>
					<span className="header-title">{label}</span>
					{ sortable
						? <div className="sort-container">
								<a key={`sort-${attrIndex}-up`} href="javascript:void(0)" onClick={this._handleSort.bind(this, name, "up")}>
									<i className="fa fa-sort-up" />
								</a>
								<a key={`sort-${attrIndex}-down`} href="javascript:void(0)" onClick={this._handleSort.bind(this, name, "down")}>
									<i className="fa fa-sort-down" />
								</a>
							</div>
						: null
					}
				</div>
			)
    }
    header.push(<div key="header-row-attr-actions admin-list-header-actions"></div>)

    return (
			<div className="admin-list-header">	
				{header}
			</div>
		)
  }

	_handleSort(target, type) {
		if (this.props.onSort) this.props.onSort(target, type)
	}

}

export default AdminPageListHeader
