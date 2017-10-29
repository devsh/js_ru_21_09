import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import App from './App'
import history from '../history'
import translations from '../translations'

const locale = 'ru'
const translation = Object.keys(translations).reduce((translation, key) => {
    translation[key] = translations[key][locale]
    return translation
}, {})

class Root extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    }

    static childContextTypes = {
        translation: PropTypes.object
    }

    getChildContext() {
        return {
            translation
        }
    }

    render() {
        return (
            <Provider store = {this.props.store}>
                <ConnectedRouter history = {history}>
                    <App />
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default Root