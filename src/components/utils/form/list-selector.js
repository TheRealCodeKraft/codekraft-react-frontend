var React = require("react")

import Select2 from 'react-select2-wrapper'
import Select from 'react-select'

class ListSelector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
			isSelectOpen: false,
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
      <Select ref="select" multiple {...props}
               value={this.state.values}
               placeholder={this.props.field.placeholder}
               options={{tags: this.props.tags ? this.state.values : false, width: "100%"}}
							 onOpen={() => this.setState({isSelectOpen: true})}
         			 onClose={() => this.setState({isSelectOpen: false})}
               onSelect={this.handleSelectionChange} 
							 onChange={this.handleChange.bind(this)}
               onUnselect={this.handleSelectionChange} />
    )

/*
    return (
      <Select2 ref="select" multiple {...props}
               value={this.state.values}
               placeholder={this.props.field.placeholder}
               options={{tags: this.props.tags ? this.state.values : false, width: "100%"}}
							 onOpen={() => this.setState({isSelectOpen: true})}
         			 onClose={() => this.setState({isSelectOpen: false})}
               onSelect={this.handleSelectionChange} 
							 onChange={this.handleChange.bind(this)}
               onUnselect={this.handleSelectionChange} />
    )
*/
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

	handleChange(value) {
		if (this.state.isSelectOpen) {
			console.log("CHANGE")
			this.setState({isSelectOpen: false})
		}
	}

  handleSelectionChange(e, obj) {
    var newValues = this.refs.select.el.val()
    newValues = newValues.filter(function(item, pos) {
      return newValues.indexOf(item) == pos
    })
    this.setState({values: newValues}, this.handleChange)
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
