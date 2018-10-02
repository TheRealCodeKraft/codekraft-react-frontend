var React = require("react")

class AdminPageListHeader extends React.Component {

  render() {
    var header = [], label = undefined
    for (var attrIndex in this.props.attributes) {
      label = this.props.attributes[attrIndex]
      if (label instanceof Object) {
        if (label.hidden) continue
        label = label.label
      }
      header.push(<div key={"header-row-attr-" + attrIndex}>{label}</div>)
    }
    header.push(<div key="header-row-attr-actions admin-list-header-actions"></div>)
    return <div className="admin-list-header">{header}</div>
  }

}

export default AdminPageListHeader
