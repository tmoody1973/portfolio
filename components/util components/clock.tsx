'use client'

import { Component } from 'react'

interface ClockProps {
  onlyTime?: boolean
  onlyDay?: boolean
}

interface ClockState {
  hour_12: boolean
  current_time: Date
}

export default class Clock extends Component<ClockProps, ClockState> {
  private month_list = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  private day_list = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  private update_time: ReturnType<typeof setInterval> | null = null

  constructor(props: ClockProps) {
    super(props)
    this.state = {
      hour_12: true,
      current_time: new Date()
    }
  }

  componentDidMount() {
    this.update_time = setInterval(() => {
      this.setState({ current_time: new Date() })
    }, 10 * 1000)
  }

  componentWillUnmount() {
    if (this.update_time) {
      clearInterval(this.update_time)
    }
  }

  render() {
    const { current_time } = this.state

    const day = this.day_list[current_time.getDay()]
    let hour = current_time.getHours()
    let minute: string | number = current_time.getMinutes()
    const month = this.month_list[current_time.getMonth()]
    const date = current_time.getDate().toString()
    const meridiem = hour < 12 ? 'AM' : 'PM'

    if (minute.toString().length === 1) {
      minute = '0' + minute
    }

    if (this.state.hour_12 && hour > 12) hour -= 12

    let display_time: string
    if (this.props.onlyTime) {
      display_time = `${hour}:${minute} ${meridiem}`
    } else if (this.props.onlyDay) {
      display_time = `${day} ${month} ${date}`
    } else {
      display_time = `${day} ${month} ${date} ${hour}:${minute} ${meridiem}`
    }

    return <span>{display_time}</span>
  }
}
