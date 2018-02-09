import React from "react"

import DatePicker from 'react-datetime'

import moment from "moment"

class DateHourPicker extends React.Component {

  state = {
    date: moment(),
    minutes: 0,
    hours: 12
  }

  componentWillReceiveProps(props) {
    if (props.value) {
      console.log(props.value)
      console.log(moment(props.value).format("HH"))
      this.setState({date: props.value, hours: parseInt(props.value.format("HH")), minutes: parseInt(props.value.format("mm"))})
    }
  }

  render() {
    return (
      <div className="date-hour-picker">
        <DatePicker value={this.state.date.format("DD/MM/YYYY")} 
                    dateFormat="DD/MM/YYYY"
                    onChange={this.handleDateChange.bind(this)}
        />
        <input className="hours" ref="hours" onChange={this.handleHoursChange.bind(this)} value={this.state.hours.toString().padStart(2, "0")} />
        <span className="hour-separator">:</span>
        <input className="minutes" ref="minutes" onChange={this.handleMinutesChange.bind(this)} value={this.state.minutes.toString().padStart(2, "0")} />
      </div>
    )
  }

  handleDateChange(date) {
    this.setState({date: date}, this.onChange)
  }

  handleHoursChange(e) {
    var value = e.target.value
    if (value == "" || isNaN(value)) value = this.state.hours
    value = parseInt(value)
    if (value < 0) value = 0
    if (value > 23) value = 23
    this.setState({hours: value}, this.onChange)
  }

  handleMinutesChange(e) {
    var value = e.target.value
    if (value == "" || isNaN(value)) value = this.state.minutes
    value = parseInt(value)
    if (value < 0) value = 0
    if (value > 59) value = 59
    this.setState({minutes: value}, this.onChange)
  }

  onChange() {
    if (this.props.onChange) {
      this.props.onChange(moment(this.state.date.format("MM/DD/YYYY") + " " + this.state.hours.toString().padStart(2, "0") + ":" + this.state.minutes.toString().padStart(2, "0")).format("MM/DD/YYYY HH:mm"))
    }
  }

}

export default DateHourPicker
