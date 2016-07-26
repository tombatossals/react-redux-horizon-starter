import React from 'react'
import { logout } from 'actions'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Logout extends React.Component {
  static propTypes = {
    logout: React.PropTypes.func.isRequired
  }

  componentDidMount () {
    this.props.logout()
  }

  render () {
    return (
      <div>
        <h1>Logged out</h1>
        <Link to="/home"> Go to main page
        </Link>
      </div>
    )
  }
}

export default connect(null, { logout })(Logout)
