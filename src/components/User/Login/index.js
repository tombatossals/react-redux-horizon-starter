import React from 'react'
import { AsyncStatus } from '../../../lib/constants'
import './styles.css'
import loading from './loading.gif'

export default class Login extends React.Component {
  static propTypes = {
    onAuthenticate: React.PropTypes.func.isRequired,
    status: React.PropTypes.bool.isRequired,
    message: React.PropTypes.string.isRequired
  }

  state = {
    status: AsyncStatus.IDLE
  }

  componentDidMount () {
    if (this.props.message) {
      this.setState({
        status: AsyncStatus.IDLE,
        message: this.props.message
      })
    }
  }

  componentWillReceiveProps(props) {
    if (props.message) {
      this.setState({
        status: AsyncStatus.IDLE,
        message: props.message
      })
    }
  }

  handleGithubLogin = () => {
    this.setState({
      status: AsyncStatus.REQUEST
    })

    this.props.onAuthenticate({
      type: 'github'
    })
  }

  handleGoogleLogin = () => {
    this.setState({
      status: AsyncStatus.REQUEST
    })

    this.props.onAuthenticate({
      type: 'google'
    })
  }

  render () {
    return (
      <div className="login-oauth">
        <h2>Log-in with an Oauth provider</h2>
        <div>
          <button className="login-button" onClick={this.handleGoogleLogin}>
            Google Sign in
          </button>
          &nbsp;
          <button className="login-button" onClick={this.handleGithubLogin}>
            Github Sign in
          </button>
          {this.state.status === AsyncStatus.REQUEST &&
            <div>
              <img src={loading} role="presentation" />
            </div>
          }
          {this.state.message &&
            <div className="login-error">
              { this.state.message }
            </div>
          }

        </div>
      </div>
    )
  }
}
