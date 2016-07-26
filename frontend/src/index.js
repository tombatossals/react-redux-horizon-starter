import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'

import Routes from './routes'
import configureStore from './lib/store'
import './styles.css'

const rootElement = document.getElementById('root')
const store = configureStore()

ReactDOM.render((
  <Provider store={store}>
    <Routes history={browserHistory} />
  </Provider>
), rootElement)
