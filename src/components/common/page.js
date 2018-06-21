import React from "react"

export default function(item, config) {

  class Page extends React.Component {

    render() {
      return (
      	<div dangerouslySetInnerHTML={{__html: item.body}} />
      )
    }
  }

  return Page
}
