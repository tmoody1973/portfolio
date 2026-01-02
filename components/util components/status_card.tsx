'use client'

import React, { Component, createRef, RefObject, ChangeEvent, MouseEvent } from 'react'
import SmallArrow from './small_arrow'

interface SliderProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className: string
  name: string
  value: number | string
}

class Slider extends Component<SliderProps> {
  render() {
    return (
      <input
        type="range"
        onChange={this.props.onChange}
        className={this.props.className}
        name={this.props.name}
        min="0"
        max="100"
        value={this.props.value}
        step="1"
      />
    )
  }
}

interface StatusCardProps {
  visible: boolean
  toggleVisible: () => void
  shutDown: () => void
  lockScreen: () => void
}

interface StatusCardState {
  sound_level: number | string
  brightness_level: number | string
}

export class StatusCard extends Component<StatusCardProps, StatusCardState> {
  wrapperRef: RefObject<HTMLDivElement | null>

  constructor(props: StatusCardProps) {
    super(props)
    this.wrapperRef = createRef()
    this.state = {
      sound_level: 75,
      brightness_level: 100
    }
  }

  handleClickOutside = (event: Event) => {
    const target = event.target as HTMLElement
    if (
      this.wrapperRef.current &&
      !this.wrapperRef.current.contains(target) &&
      !target.closest('#status-bar')
    ) {
      this.props.toggleVisible()
    }
  }

  componentDidMount() {
    this.setState({
      sound_level: localStorage.getItem('sound-level') || 75,
      brightness_level: localStorage.getItem('brightness-level') || 100
    }, () => {
      const monitorScreen = document.getElementById('monitor-screen')
      if (monitorScreen) {
        const brightness = Number(this.state.brightness_level)
        monitorScreen.style.filter = `brightness(${3 / 400 * brightness + 0.25})`
      }
    })

    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  handleBrightness = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    this.setState({ brightness_level: value })
    localStorage.setItem('brightness-level', value)
    const monitorScreen = document.getElementById('monitor-screen')
    if (monitorScreen) {
      monitorScreen.style.filter = `brightness(${3 / 400 * Number(value) + 0.25})`
    }
  }

  handleSound = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    this.setState({ sound_level: value })
    localStorage.setItem('sound-level', value)
  }

  render() {
    return (
      <div
        ref={this.wrapperRef}
        className={
          'absolute bg-ub-cool-grey rounded-md py-4 top-9 right-3 shadow border-black border border-opacity-20 status-card' +
          (this.props.visible ? ' visible animateShow' : ' invisible')
        }
      >
        <div className="absolute w-0 h-0 -top-1 right-6 top-arrow-up" />
        <div className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
          <div className="w-8">
            <img width="16px" height="16px" src="./themes/Yaru/status/audio-headphones-symbolic.svg" alt="ubuntu headphone" />
          </div>
          <Slider
            onChange={this.handleSound}
            className="ubuntu-slider w-2/3"
            value={this.state.sound_level}
            name="headphone_range"
          />
        </div>
        <div className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
          <div className="w-8">
            <img width="16px" height="16px" src="./themes/Yaru/status/display-brightness-symbolic.svg" alt="ubuntu brightness" />
          </div>
          <Slider
            onChange={this.handleBrightness}
            className="ubuntu-slider w-2/3"
            name="brightness_range"
            value={this.state.brightness_level}
          />
        </div>
        <div className="w-64 flex content-center justify-center">
          <div className="w-2/4 border-black border-opacity-50 border-b my-2 border-solid" />
        </div>
        <div className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
          <div className="w-8">
            <img width="16px" height="16px" src="./themes/Yaru/status/network-wireless-signal-good-symbolic.svg" alt="ubuntu wifi" />
          </div>
          <div className="w-2/3 flex items-center justify-between text-gray-400">
            <span>OnePlus 8 Pro</span>
            <SmallArrow angle="right" />
          </div>
        </div>
        <div className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
          <div className="w-8">
            <img width="16px" height="16px" src="./themes/Yaru/status/bluetooth-symbolic.svg" alt="ubuntu bluetooth" />
          </div>
          <div className="w-2/3 flex items-center justify-between text-gray-400">
            <span>Off</span>
            <SmallArrow angle="right" />
          </div>
        </div>
        <div className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20">
          <div className="w-8">
            <img width="16px" height="16px" src="./themes/Yaru/status/battery-good-symbolic.svg" alt="ubuntu battery" />
          </div>
          <div className="w-2/3 flex items-center justify-between text-gray-400">
            <span>2:40 Remaining (75%)</span>
            <SmallArrow angle="right" />
          </div>
        </div>
        <div className="w-64 flex content-center justify-center">
          <div className="w-2/4 border-black border-opacity-50 border-b my-2 border-solid" />
        </div>
        <div
          id="open-settings"
          className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20"
        >
          <div className="w-8">
            <img width="16px" height="16px" src="./themes/Yaru/status/emblem-system-symbolic.svg" alt="ubuntu settings" />
          </div>
          <div className="w-2/3 flex items-center justify-between">
            <span>Settings</span>
          </div>
        </div>
        <div
          onClick={this.props.lockScreen}
          className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20 cursor-pointer"
        >
          <div className="w-8">
            <img width="16px" height="16px" src="./themes/Yaru/status/changes-prevent-symbolic.svg" alt="ubuntu lock" />
          </div>
          <div className="w-2/3 flex items-center justify-between">
            <span>Lock</span>
          </div>
        </div>
        <div
          onClick={this.props.shutDown}
          className="w-64 py-1.5 flex items-center justify-center bg-ub-cool-grey hover:bg-ub-warm-grey hover:bg-opacity-20 cursor-pointer"
        >
          <div className="w-8">
            <img width="16px" height="16px" src="./themes/Yaru/status/system-shutdown-symbolic.svg" alt="ubuntu power" />
          </div>
          <div className="w-2/3 flex items-center justify-between">
            <span>Power Off / Log Out</span>
            <SmallArrow angle="right" />
          </div>
        </div>
      </div>
    )
  }
}

export default StatusCard
