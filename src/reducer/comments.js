import { ADD_COMMENT, LOAD_ARTICLE_COMMENTS, LOAD_COMMENTS, START, SUCCESS } from '../constants'
import {arrToMap} from './utils'
import {OrderedMap, Map, Record, List} from 'immutable'

const CommentRecord = Record({
    id: null,
    text: null,
    user: null
})

const ReducerState = Record({
    entities: new OrderedMap({}),
    count: null,
    loadingEntities: new List(),
    loadedEntities: new List()
})


export default (state = new ReducerState(), action) => {
    const { type, payload, response, randomId } = action

    switch (type) {
        case ADD_COMMENT:
            return state.setIn(['entities', randomId], new CommentRecord({...payload.comment, id: randomId}))

        case LOAD_ARTICLE_COMMENTS + SUCCESS:
            return state.mergeIn(['entities'], arrToMap(response, CommentRecord))

        case LOAD_COMMENTS + START:
        {
            const {offset, limit} = payload

            let newState = state

            for(let i = 0; i < limit; i++)
                newState = newState.setIn(['loadingEntities', offset + i], true)

            return newState
        }

        case LOAD_COMMENTS + SUCCESS:
        {
            const {total: count, records: comments, offset, limit} = payload

            let newState = state

            for(let i = 0; i < limit; i++)
                newState = newState.setIn(['loadingEntities', offset + i], false)

            return comments
                .reduce((state, item, index) => state
                    .setIn(['entities', item.id], new CommentRecord(item))
                    .setIn(['loadedEntities', offset + index], item.id)
                    , newState)
                .set('count', count)
        }
    }

    return state
}