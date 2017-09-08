import React from "react"

class AdminPageListHeader extends React.Component {
 
  constructor(props) {
    super(props)

    this.tableRowStyles = {
      display: "table-row",
      background: "#414450",
      color: "#ffffff"
    }

    this.tableCellStyles = {
      display: "table-cell",
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
    return <div style={this.tableRowStyles}>{header}</div>
  }

}

export default AdminPageListHeader
