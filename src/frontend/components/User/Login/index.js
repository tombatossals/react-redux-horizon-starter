import React from 'react'
import styles from './styles'
import { AsyncStatus, UserStatus } from 'lib/constants'

export default class Login extends React.Component {
  static propTypes = {
    onAuthenticate: React.PropTypes.func.isRequired,
    status: React.PropTypes.string.isRequired
  }

  state = {
    status: undefined
  }

  githubLogin = () => {
    this.setState({
      status: UserStatus.REQUEST
    })

    this.props.onAuthenticate({
      type: 'github'
    })
  }

  googleLogin = () => {
    this.setState({
      status: UserStatus.REQUEST
    })

    this.props.onAuthenticate({
      type: 'google'
    })
  }

  render () {
    return (
      <div style={styles.oauth}>
        <h2>Log-in with an Oauth provider</h2>
        <div>
          <button style={styles.google} onClick={this.googleLogin}>
            Google Sign in
          </button>
          &nbsp;
          <button style={styles.github} onClick={this.githubLogin}>
            Github Sign in
          </button>
          {this.state.status === UserStatus.REQUEST &&
            <div style={styles.loading}>
              <img src="/static/images/loading.gif" />
            </div>
          }
        </div>
      </div>
    )
  }
}
