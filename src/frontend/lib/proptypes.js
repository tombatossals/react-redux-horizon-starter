import React from 'react'

export const getUserPropTypes = () => React.PropTypes.shape({
  status: React.PropTypes.string,
  message: React.PropTypes.string,
  sync: React.PropTypes.bool,
  action: React.PropTypes.shape({
    status: React.PropTypes.string,
    message: React.PropTypes.string
  }),
  data: React.PropTypes.shape({
    username: React.PropTypes.string,
    email: React.PropTypes.string
  })
})
