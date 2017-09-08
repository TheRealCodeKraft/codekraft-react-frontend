import React from "react"

import Sidebar from 'react-sidebar'

class AdminSidebar extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      sidebarOpen: false
    }

    this.handleSetSidebarOpen = this.handleSetSidebarOpen.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  render() {
    return (
      <Sidebar sidebar={this.getSidebarContent()} 
               open={this.state.sidebarOpen} 
               onSetOpen={this.handleSetSidebarOpen}
               rootClassName="admin-sidebar"
               sidebarClassName={"admin-sidebar-container" + (this.props.tinify ? " tiny-sidebar" : "")}
               overlayClassName="admin-sidebar-overlay"
               pullRight={true}>
        <span />
      </Sidebar>
    )
  }

  getSidebarContent() {
    return (
      <div style={{display: "flex", flexDirection: "column", height: "100%"}}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: 20, background: "#b53c3c", marginBottom: 20}}>
          <h3 style={{textTransform: "uppercase"}}>{this.props.title}</h3>
          <a href="#" onClick={this.handleClose}><i className="fa fa-times text-warning" style={{color: "#ffffff", fontSize: "2em"}}></i></a>
        </div>
        <div style={{flex: 1, height: "100%", overflow: "auto", padding: 20}}>
          {this.props.children}
        </div>
      </div>
    )
  }

  open() {
    this.setState({sidebarOpen: true})
  }

  close() {
    this.setState({sidebarOpen: false}, function() {
      if (this.props.onClose) this.props.onClose()
    })
  }

  handleSetSidebarOpen(open) {
    if (!open) this.close()
    else this.open()
  }

  handleClose(e) {
    e.preventDefault()
    this.close()
  }

}

export default AdminSidebar
