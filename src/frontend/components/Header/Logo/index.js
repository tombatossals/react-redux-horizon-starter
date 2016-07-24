import React from 'react'
import styles from 'components/Header/Logo/styles'

const Logo = (props) => (
  <h1 onClick={props.onClick} style={styles.link}>
    {props.text}
  </h1>
)

Logo.propTypes = {
  text: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
}

export default Logo
