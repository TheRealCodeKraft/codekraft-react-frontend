import React from "react"

export default function(item, config) {

  class Page extends React.Component {

    render() {
      return (
        <div>
          <h1>{item.title}</h1>
          <div dangerouslySetInnerHTML={{__html: item.body}} />
        </div>
      )
    }
  }

  return Page
}
