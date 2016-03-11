/* @flow */
import React from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './app.js'
import reducers from './reducers'

let store = createStore(reducers)

export default () => (
    <Provider store={store}>
        <App />
    </Provider>
)
