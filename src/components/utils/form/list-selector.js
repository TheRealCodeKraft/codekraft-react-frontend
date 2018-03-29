var React = require("react")

import Select2 from 'react-select2-wrapper'
import Select from 'react-select'

class ListSelector extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      values: []
    }
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
									var item = {}
									item[this.props.field.listKey] = value[this.props.field.listKey]
									item[this.props.field.listValue] = val
									return item
                  //return {name: val, id: value[this.props.field.listKey]}
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
      <Select.Creatable
				ref="select" 
				multi={true} 
				valueKey={this.props.field.listKey}
				labelKey={this.props.field.listValue}
				{...props}
				value={this.state.values}
				placeholder={this.props.field.placeholder}
				options={this.state.options}
				onChange={this.handleChange.bind(this)}
			/>
    )
  }

  handleChange(values) {
		this.setState({values: values.map((val) => (val[this.props.field.listKey] == val[this.props.field.listValue] ? val : val[this.props.field.listKey]))}, () => {
			if (this.props.onChange) {
				this.props.onChange({
					target: {
						name: this.props.field.name,
						value: this.state.values
					}
				})
			}
		})
  }

}

export default ListSelector
