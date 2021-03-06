import React from 'react'
import { getUserPropTypes } from '../../lib/proptypes'
import { connect } from 'react-redux'
import { checkAuthToken } from '../../actions'
import Header from '../../components/Header'
import { withRouter } from 'react-router'
import './styles.css'

class Layout extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    checkAuthToken: React.PropTypes.func.isRequired,
    user: getUserPropTypes(),
    router: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.checkAuthToken()
  }

  handleNavigate = (url) => {
    this.props.router.push(url)
  }

  render () {
    return (
      <div className="layout">
        <Header user={this.props.user} onNavigationChange={this.handleNavigate} />
        {this.props.children}
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({ user })
export default withRouter(connect(mapStateToProps, { checkAuthToken })(Layout))
