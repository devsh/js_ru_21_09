import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import App from './App'

class Root extends Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    };

    render() {
        return (
            <Provider store = {this.props.store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        )
    }
}

export default Root