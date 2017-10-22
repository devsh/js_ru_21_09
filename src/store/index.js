import {createStore, applyMiddleware} from 'redux'
import reducer from '../reducer'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import randomId from '../middlewares/randomId'
import api from '../middlewares/api'

const enchancer = applyMiddleware(thunk, randomId, api, logger)

const store = createStore(reducer, enchancer)

//dev only
window.store = store

export default store