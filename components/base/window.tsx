'use client'

import React, { Component, createRef, RefObject, DragEvent } from 'react'
import Draggable from 'react-draggable'
import Settings from '../apps/settings'
import ReactGA from 'react-ga4'
import { displayTerminal } from '../apps/terminal'

interface WindowProps {
  id: string
  title: string
  screen: () => React.ReactNode
  isFocused: boolean
  minimized: boolean
  changeBackgroundImage?: (img: string) => void
  bg_image_name?: string
  addFolder?: (name: string) => void
  openApp?: (id: string) => void
  focus: (id: string) => void
  hideSideBar: (id: string, hide: boolean) => void
  hasMinimised: (id: string) => void
  closed: (id: string) => void
}

interface WindowState {
  cursorType: string
  width: number
  height: number
  closed: boolean
  maximized: boolean
  parentSize: {
    height: number
    width: number
  }
}

export class Window extends Component<WindowProps, WindowState> {
  id: string | null = null
  startX = 60
  startY = 10
  nodeRef: RefObject<HTMLDivElement | null> = createRef()

  constructor(props: WindowProps) {
    super(props)
    this.state = {
      cursorType: 'cursor-default',
      width: 60,
      height: 85,
      closed: false,
      maximized: false,
      parentSize: {
        height: 100,
        width: 100
      }
    }
  }

  componentDidMount() {
    this.id = this.props.id
    this.setDefaultWindowDimension()

    ReactGA.send({ hitType: 'pageview', page: `/${this.id}`, title: 'Custom Title' })

    window.addEventListener('resize', this.resizeBoundaries)
  }

  componentWillUnmount() {
    ReactGA.send({ hitType: 'pageview', page: '/desktop', title: 'Custom Title' })

    window.removeEventListener('resize', this.resizeBoundaries)
  }

  setDefaultWindowDimension = () => {
    if (window.innerWidth < 640) {
      this.setState({ height: 60, width: 85 }, this.resizeBoundaries)
    } else {
      this.setState({ height: 85, width: 60 }, this.resizeBoundaries)
    }
  }

  resizeBoundaries = () => {
    this.setState({
      parentSize: {
        height: window.innerHeight - (window.innerHeight * (this.state.height / 100.0)) - 28,
        width: window.innerWidth - (window.innerWidth * (this.state.width / 100.0))
      }
    })
  }

  changeCursorToMove = () => {
    this.focusWindow()
    if (this.state.maximized) {
      this.restoreWindow()
    }
    this.setState({ cursorType: 'cursor-move' })
  }

  changeCursorToDefault = () => {
    this.setState({ cursorType: 'cursor-default' })
  }

  handleVerticalResize = () => {
    this.setState({ height: this.state.height + 0.1 }, this.resizeBoundaries)
  }

  handleHorizontalResize = () => {
    this.setState({ width: this.state.width + 0.1 }, this.resizeBoundaries)
  }

  setWindowsPosition = () => {
    const r = document.querySelector('#' + this.id) as HTMLElement
    if (!r) return
    const rect = r.getBoundingClientRect()
    r.style.setProperty('--window-transform-x', rect.x.toFixed(1) + 'px')
    r.style.setProperty('--window-transform-y', (Number(rect.y.toFixed(1)) - 32) + 'px')
  }

  checkOverlap = () => {
    const r = document.querySelector('#' + this.id) as HTMLElement
    if (!r) return
    const rect = r.getBoundingClientRect()
    if (Number(rect.x.toFixed(1)) < 50) {
      this.props.hideSideBar(this.id!, true)
    } else {
      this.props.hideSideBar(this.id!, false)
    }
  }

  focusWindow = () => {
    this.props.focus(this.id!)
  }

  minimizeWindow = () => {
    let posx = -310
    if (this.state.maximized) {
      posx = -510
    }
    this.setWindowsPosition()
    const sidebarApp = document.querySelector('#sidebar-' + this.id) as HTMLElement
    if (!sidebarApp) return
    const sidebBarAppRect = sidebarApp.getBoundingClientRect()

    const r = document.querySelector('#' + this.id) as HTMLElement
    if (!r) return
    r.style.transform = `translate(${posx}px,${Number(sidebBarAppRect.y.toFixed(1)) - 240}px) scale(0.2)`
    this.props.hasMinimised(this.id!)
  }

  restoreWindow = () => {
    const r = document.querySelector('#' + this.id) as HTMLElement
    if (!r) return
    this.setDefaultWindowDimension()
    const posx = r.style.getPropertyValue('--window-transform-x')
    const posy = r.style.getPropertyValue('--window-transform-y')

    r.style.transform = `translate(${posx},${posy})`
    setTimeout(() => {
      this.setState({ maximized: false })
      this.checkOverlap()
    }, 300)
  }

  maximizeWindow = () => {
    if (this.state.maximized) {
      this.restoreWindow()
    } else {
      this.focusWindow()
      const r = document.querySelector('#' + this.id) as HTMLElement
      if (!r) return
      this.setWindowsPosition()
      r.style.transform = 'translate(-1pt,-2pt)'
      this.setState({ maximized: true, height: 96.3, width: 100.2 })
      this.props.hideSideBar(this.id!, true)
    }
  }

  closeWindow = () => {
    this.setWindowsPosition()
    this.setState({ closed: true }, () => {
      this.props.hideSideBar(this.id!, false)
      setTimeout(() => {
        this.props.closed(this.id!)
      }, 300)
    })
  }

  render() {
    return (
      <Draggable
        axis="both"
        handle=".bg-ub-window-title"
        grid={[1, 1]}
        scale={1}
        nodeRef={this.nodeRef}
        onStart={this.changeCursorToMove}
        onStop={this.changeCursorToDefault}
        onDrag={this.checkOverlap}
        allowAnyClick={false}
        defaultPosition={{ x: this.startX, y: this.startY }}
        bounds={{ left: 0, top: 0, right: this.state.parentSize.width, bottom: this.state.parentSize.height }}
      >
        <div
          ref={this.nodeRef}
          style={{ width: `${this.state.width}%`, height: `${this.state.height}%` }}
          className={
            this.state.cursorType +
            ' ' +
            (this.state.closed ? ' closed-window ' : '') +
            (this.state.maximized ? ' duration-300 rounded-none' : ' rounded-lg rounded-b-none') +
            (this.props.minimized ? ' opacity-0 invisible duration-200 ' : '') +
            (this.props.isFocused ? ' z-30 ' : ' z-20 notFocused') +
            ' opened-window overflow-hidden min-w-1/4 min-h-1/4 main-window absolute window-shadow border-black border-opacity-40 border border-t-0 flex flex-col'
          }
          id={this.id || undefined}
        >
          <WindowYBorder resize={this.handleHorizontalResize} />
          <WindowXBorder resize={this.handleVerticalResize} />
          <WindowTopBar title={this.props.title} />
          <WindowEditButtons
            minimize={this.minimizeWindow}
            maximize={this.maximizeWindow}
            isMaximised={this.state.maximized}
            close={this.closeWindow}
            id={this.id || ''}
          />
          {this.id === 'settings' ? (
            <Settings
              changeBackgroundImage={this.props.changeBackgroundImage!}
              currBgImgName={this.props.bg_image_name!}
            />
          ) : (
            <WindowMainScreen
              screen={this.props.screen}
              title={this.props.title}
              addFolder={this.props.id === 'terminal' ? this.props.addFolder : undefined}
              openApp={this.props.openApp}
            />
          )}
        </div>
      </Draggable>
    )
  }
}

export default Window

interface WindowTopBarProps {
  title: string
}

export function WindowTopBar({ title }: WindowTopBarProps) {
  return (
    <div className="relative bg-ub-window-title border-t-2 border-white border-opacity-5 py-1.5 px-3 text-white w-full select-none rounded-b-none">
      <div className="flex justify-center text-sm font-bold">{title}</div>
    </div>
  )
}

interface WindowBorderProps {
  resize: () => void
}

export class WindowYBorder extends Component<WindowBorderProps> {
  trpImg: HTMLImageElement | null = null

  componentDidMount() {
    this.trpImg = new Image(0, 0)
    this.trpImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    this.trpImg.style.opacity = '0'
  }

  handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (this.trpImg) {
      e.dataTransfer.setDragImage(this.trpImg, 0, 0)
    }
  }

  render() {
    return (
      <div
        className="window-y-border border-transparent border-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onDragStart={this.handleDragStart}
        onDrag={this.props.resize}
        draggable
      />
    )
  }
}

export class WindowXBorder extends Component<WindowBorderProps> {
  trpImg: HTMLImageElement | null = null

  componentDidMount() {
    this.trpImg = new Image(0, 0)
    this.trpImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    this.trpImg.style.opacity = '0'
  }

  handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    if (this.trpImg) {
      e.dataTransfer.setDragImage(this.trpImg, 0, 0)
    }
  }

  render() {
    return (
      <div
        className="window-x-border border-transparent border-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        onDragStart={this.handleDragStart}
        onDrag={this.props.resize}
        draggable
      />
    )
  }
}

interface WindowEditButtonsProps {
  minimize: () => void
  maximize: () => void
  close: () => void
  isMaximised: boolean
  id: string
}

export function WindowEditButtons({ minimize, maximize, isMaximised, close, id }: WindowEditButtonsProps) {
  return (
    <div className="absolute select-none right-0 top-0 mt-1 mr-1 flex justify-center items-center">
      <span
        className="mx-1.5 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full flex justify-center mt-1 h-5 w-5 items-center cursor-pointer"
        onClick={minimize}
      >
        <img
          src="./themes/Yaru/window/window-minimize-symbolic.svg"
          alt="ubuntu window minimize"
          className="h-5 w-5 inline"
        />
      </span>
      {isMaximised ? (
        <span
          className="mx-2 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full flex justify-center mt-1 h-5 w-5 items-center cursor-pointer"
          onClick={maximize}
        >
          <img
            src="./themes/Yaru/window/window-restore-symbolic.svg"
            alt="ubuntu window restore"
            className="h-5 w-5 inline"
          />
        </span>
      ) : (
        <span
          className="mx-2 bg-white bg-opacity-0 hover:bg-opacity-10 rounded-full flex justify-center mt-1 h-5 w-5 items-center cursor-pointer"
          onClick={maximize}
        >
          <img
            src="./themes/Yaru/window/window-maximize-symbolic.svg"
            alt="ubuntu window maximize"
            className="h-5 w-5 inline"
          />
        </span>
      )}
      <button
        tabIndex={-1}
        id={`close-${id}`}
        className="mx-1.5 focus:outline-none cursor-default bg-ub-orange bg-opacity-90 hover:bg-opacity-100 rounded-full flex justify-center mt-1 h-5 w-5 items-center"
        onClick={close}
      >
        <img
          src="./themes/Yaru/window/window-close-symbolic.svg"
          alt="ubuntu window close"
          className="h-5 w-5 inline"
        />
      </button>
    </div>
  )
}

interface WindowMainScreenProps {
  screen: () => React.ReactNode
  title: string
  addFolder?: (name: string) => void
  openApp?: (id: string) => void
}

interface WindowMainScreenState {
  setDarkBg: boolean
}

export class WindowMainScreen extends Component<WindowMainScreenProps, WindowMainScreenState> {
  constructor(props: WindowMainScreenProps) {
    super(props)
    this.state = {
      setDarkBg: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ setDarkBg: true })
    }, 3000)
  }

  render() {
    return (
      <div
        className={
          'w-full flex-grow z-20 max-h-full overflow-y-auto windowMainScreen' +
          (this.state.setDarkBg ? ' bg-ub-drk-abrgn ' : ' bg-ub-cool-grey')
        }
      >
        {this.props.addFolder
          ? displayTerminal(this.props.addFolder, this.props.openApp!)
          : this.props.screen()}
      </div>
    )
  }
}
