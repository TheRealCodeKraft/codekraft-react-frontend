var React = require("react")

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
               pullRight={true} style={{top: 0}}>
        <span />
      </Sidebar>
    )
  }

  getSidebarContent() {
    return (
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h3 style={{textTransform: "uppercase"}}>{this.props.title}</h3>
          <a href="#" onClick={this.handleClose}><i className="fa fa-times text-warning sidebar-close-icon"></i></a>
        </div>
        <div className="sidebar-content-container">
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
