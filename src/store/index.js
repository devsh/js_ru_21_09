import {createStore, applyMiddleware, compose} from 'redux'
import reducer from '../reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import {routerMiddleware} from 'react-router-redux'
import randomId from '../middlewares/randomId'
import api from '../middlewares/api'
import history from '../history'

const conposeEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const enchancer = conposeEnchancer(applyMiddleware(thunk, randomId, api, routerMiddleware(history), logger))

const store = createStore(reducer, enchancer)

//dev only
window.store = store

export default store