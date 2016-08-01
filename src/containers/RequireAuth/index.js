import React, { Component } from 'react'
import { getUserPropTypes } from '../../lib/proptypes'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { UserStatus } from '../../lib/constants'

export default (ChildComponent) => {
  class RequireAuthentication extends Component {
    static propTypes = {
      user: getUserPropTypes(),
      router: React.PropTypes.object,
      routeParams: React.PropTypes.object,
      location: React.PropTypes.shape({
        pathname: React.PropTypes.string
      })
    }

    componentDidMount () {
      this.ensureLoggedIn(this.props)
    }

    componentDidUpdate (props) {
      this.ensureLoggedIn(props)
    }

    ensureLoggedIn (props) {
      if (this.props.user.status === UserStatus.ANONYMOUS) {
        this.props.router.push(`/login?redirect=${this.props.location.pathname}`)
      }
    }

    render () {
      if (this.props.user.status === UserStatus.AUTHENTICATED) {
        return <ChildComponent {...this.props} />
      }
      return null
    }
  }

  const mapStateToProps = ({ user }) => ({
    user
  })

  return withRouter(connect(mapStateToProps)(RequireAuthentication))
}
