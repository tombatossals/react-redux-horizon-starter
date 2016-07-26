import React from 'react'
import Logo from '../Logo'
import { getUserPropTypes } from '../../../lib/proptypes'
import { UserStatus } from '../../../lib/constants'
import { Link } from 'react-router'
import './styles.css'

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

  handleNavigateHome = () => {
    this.handleOnClick('/home')
  }

  render () {
    return (
      <div className="header-layout">
        {this.props.user.status === UserStatus.ANONYMOUS &&
          <Link className="header-menu" to="/login">Login</Link>
        }
        {this.props.user.status === UserStatus.AUTHENTICATED &&
          <Link className="header-menu" to="/logout">Logout</Link>
        }
        <Logo className="header-logo" text="Horizon Oauth" onClick={this.handleNavigateHome} />
      </div>
    )
  }
}
