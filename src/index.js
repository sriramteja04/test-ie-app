import 'react-app-polyfill/ie9'
import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import Navigation from './util/history'
import { store, persistor } from './config/redux'

import App from './App'

const EnhancedApp = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router history={Navigation}>
                <App />
            </Router>
        </PersistGate>
    </Provider>
)

ReactDOM.render(<EnhancedApp />, document.getElementById('root'))
