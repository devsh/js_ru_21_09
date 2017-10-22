import { ADD_COMMENT, LOAD_ARTICLE_COMMENTS, START, SUCCESS } from '../constants'
import {normalizedComments} from '../fixtures'
import {arrToMap} from './utils'
import {ReducerRecord} from './constants'
import {Record} from 'immutable'

const CommentRecord = new Record({
    id: null,
    user: null,
    text: null
})

export default (state = new ReducerRecord(), action) => {
    const { type, payload, randomId } = action

    switch (type) {
        case ADD_COMMENT:
            return state.setIn(['entities', randomId], new CommentRecord({
                ...payload.comment,
                id: randomId
            }))
        
        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return state.mergeIn(['entities'], arrToMap(payload.response, CommentRecord))
    }

    return state
}