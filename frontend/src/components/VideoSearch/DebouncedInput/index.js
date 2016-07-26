import React from 'react'

export default class DebouncedInput extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string
  }

  state = {
    tid: void 0,
    value: this.props.value || ''
  }

  shouldComponentUpdate (nextProps, nextState) {
    const keys = Object.keys(nextProps)
    const { value } = this.state

    if (value !== nextState.value) {
      return true
    }

    if (keys.length !== Object.keys(this.props).length) {
      return true
    }

    const changed = keys.some(key => nextProps[key] !== this.props[key])

    if (changed) {
      return true
    }

    return false
  }

  componentWillUnmount () {
    const { tid } = this.state
    window.clearTimeout(tid)
  }

  handleChangeTerm = (event) => {
    const { value } = event.target
    const { tid } = this.state

    if (tid) {
      clearTimeout(tid)
    }

    this.setState({
      value,
      tid: setTimeout(this.emitChange.bind(this), 300)
    })
  }

  emitChange () {
    const { value } = this.state
    const { onChange } = this.props

    this.setState({ tid: void 0 })

    onChange(value)
  }

  render () {
    return (
      <input
        type="text"
        className="form-control"
        {...this.props}
        value={this.state.value}
        onChange={this.handleChangeTerm} />
    )
  }
}
