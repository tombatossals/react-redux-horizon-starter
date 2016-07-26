import React from 'react'
import { Link } from 'react-router'
import styles from './styles'

export default () => (
  <div style={styles.box}>
    <Link to="/video-search">Video search (Authenticated)</Link>
  </div>
)
