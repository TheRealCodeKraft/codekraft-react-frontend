import React from "react"

class MainWrapper extends React.Component {

  render() {
    return (
      <div id={this.props.navigation.mainContainerId || "main-container"} className={this.props.navigation.mainContainerClass || "wrapper"}>
        {this.props.children}
      </div>
    )
  }
}

export default MainWrapper
