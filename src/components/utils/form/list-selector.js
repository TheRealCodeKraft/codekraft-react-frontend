import React from "react"

import Select2 from 'react-select2-wrapper'

class ListSelector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      values: []
    }

    this.handleSelectionChange = this.handleSelectionChange.bind(this)
  }

  componentWillMount() {
    this.setValues(this.props)
  }

  componentWillReceiveProps(props) {
    this.setValues(props)
  }

  setValues(props) {
    var val="", splitted=[]
    var options = [], values = []
    if (this.props.tags) {
      options = props.options
    } else {
      options = props.options.map(value => {
                  splitted = this.props.field.listValue.split(' ')
                  val = ""
                  for (var i in splitted) {
                    val += value[splitted[i]] + " "
                  }
                  return {text: val, id: value[this.props.field.listKey]}
      })
    }
    this.setState({values: props.defaultValue, options: options})
  }

  render() {
    var props = {}
    if (!this.props.tags) {
      props.data = this.state.options
    }

    return (
      <Select2 ref="select" multiple {...props}
               value={this.state.values}
               placeholder={this.props.field.placeholder}
               options={{tags: this.props.tags ? this.state.values : false, width: "100%"}}
               onSelect={this.handleSelectionChange} 
               onUnselect={this.handleSelectionChange} />
    )
  }

  getAvailableValues() {
    var self=this
    return this.props.options.filter(function(v) {
      return (self.state.values && self.state.values.indexOf(v[self.props.field.listKey]) === -1)
    })
  }

  getCurrentValues() {
    var self=this
    return this.props.options.filter(function(v) { 
      return self.state.values && self.state.values.indexOf(v[self.props.field.listKey]) >= 0
    })
  }

  handleSelectionChange(e, obj) {
    this.setState({values: this.refs.select.el.val()}, this.handleChange)
  }

  handleChange() {
    if (this.props.onChange) {
      this.props.onChange({
        target: {
          name: this.props.field.name,
          value: this.state.values
        }
      })
    }
  }

}

export default ListSelector
