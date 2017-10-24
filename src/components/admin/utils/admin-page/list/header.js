var React = require("react")

class AdminPageListHeader extends React.Component {
 
  constructor(props) {
    super(props)

    this.tableRowStyles = {
      display: "table-row",
      color: "#ffffff"
    }

    this.tableCellStyles = {
      padding: 5
    }

    this.tableCellActionStyles = JSON.parse(JSON.stringify(this.tableCellStyles))
    this.tableCellActionStyles.textAlign = "right"

  }

  render() {
    var header = [], label = undefined
    for (var attrIndex in this.props.attributes) {
      label = this.props.attributes[attrIndex]
      if (label instanceof Object) {
        if (label.hidden) continue
        label = label.label
      }
      header.push(<div key={"header-row-attr-" + attrIndex} style={this.tableCellStyles}>{label}</div>)
    }
    header.push(<div key="header-row-attr-actions" style={this.tableCellActionsStyles}></div>)
    return <div className="admin-list-header" style={this.tableRowStyles}>{header}</div>
  }

}

export default AdminPageListHeader
