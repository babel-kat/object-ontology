import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'

import reducers from './reducers/'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

let store = createStore(
  reducers
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.REACT_APP_BASENAME}>
      <App />
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
)

registerServiceWorker()
