import React from 'react'
import LoginComponent from 'components/User/Login'
import { authenticate, checkAuthToken } from 'actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getUserPropTypes } from 'lib/proptypes'
import { UserStatus } from 'lib/constants'

class Login extends React.Component {
  static propTypes = {
    user: getUserPropTypes(),
    authenticate: React.PropTypes.func.isRequired,
    router: React.PropTypes.any,
    location: React.PropTypes.shape({
      state: React.PropTypes.shape({
        pathname: React.PropTypes.string
      })
    })
  }

  componentDidMount () {
    this.ensureNotLoggedIn(this.props)
  }

  componentWillReceiveProps (props) {
    this.ensureNotLoggedIn(props)
  }

  onSignup = () => {
    this.props.router.push('/user/signup')
  }

  ensureNotLoggedIn (props) {
    if (props.user.status === UserStatus.AUTHENTICATED) {
      props.router.push(props.location.query.redirect || '/')
    }
  }

  render () {
    if (this.props.user.status !== UserStatus.ANONYMOUS) {
      return null
    }

    return (
      <LoginComponent
        external
        onSignup={this.onSignup}
        onSubmit={this.props.authenticate}
        status={this.props.user.status}
        message={this.props.user.message}
      />
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user
})

export default withRouter(connect(mapStateToProps, { authenticate, checkAuthToken })(Login))
