import React from 'react'
import Logo from '../Logo'
import styles from './style'
import { getUserPropTypes } from 'lib/proptypes'
import { UserStatus } from 'lib/constants'
import { Link } from 'react-router'

export default class HeaderToolbar extends React.Component {
  static propTypes = {
    user: getUserPropTypes(),
    onNavigationChange: React.PropTypes.func
  }

  state = {
    open: false
  }

  handleTouchTap = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  }

  handleOnClick = (url) => {
    this.setState({
      open: false
    })
    this.props.onNavigationChange(url)
  }

  navigateHome = () => {
    this.handleOnClick('/home')
  }

  navigateUserLogin = () => {
    this.handleOnClick('/login')
  }

  render () {
    return (
      <div style={styles.toolbar}>
        {this.props.user.status === UserStatus.ANONYMOUS &&
          <Link style={styles.menu} to="/login">Login</Link>
        }
        {this.props.user.status === UserStatus.AUTHENTICATED &&
          <Link style={styles.menu} to="/logout">Logout</Link>
        }
        <Logo style={styles.logo} text="Horizon Oauth" onClick={this.navigateHome} />
      </div>
    )
  }
}
