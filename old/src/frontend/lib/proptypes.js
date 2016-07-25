import React from 'react'

export const getUserPropTypes = () => React.PropTypes.shape({
  status: React.PropTypes.string,
  message: React.PropTypes.string
})
