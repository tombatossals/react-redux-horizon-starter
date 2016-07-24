import React from 'react'
import styles from 'components/User/Login/style'
import { UserStatus } from 'lib/constants'

export default class Login extends React.Component {
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    status: React.PropTypes.string.isRequired
  }

  githubLogin = () => {
    this.setState({
      status: UserStatus.REQUEST
    })

    this.props.onSubmit({
      type: 'github'
    })
  }

  googleLogin = () => {
    this.setState({
      status: UserStatus.REQUEST
    })

    this.props.onSubmit({
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
        </div>
      </div>
    )
  }
}
