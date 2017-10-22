import { DELETE_ARTICLE, ADD_COMMENT, LOAD_ALL_ARTICLES, LOAD_ARTICLE, SUCCESS, START } from '../constants'
import {arrToMap} from './utils'
import {Record, OrderedMap} from 'immutable'

const ArticleRecord = Record({
    id: null,
    title: null,
    text: null,
    date: null,
    comments: [],
    loading: false
})

const ReducerRecord = Record({
    entities: new OrderedMap({}),
    loading: false,
    loaded: false
})

export default (state = new ReducerRecord(), action) => {
    const { type, payload, randomId, response } = action

    switch (type) {
        case DELETE_ARTICLE:
            return state.deleteIn(['entities', payload.id])

        case ADD_COMMENT:
            return state
                .updateIn(['entities', payload.articleId, 'comments'], comments => comments.concat(randomId))

        case LOAD_ALL_ARTICLES + START:
            return state.set('loading', true)

        case LOAD_ALL_ARTICLES + SUCCESS:
            return state
                .set('loading', false)
                .set('loaded', true)
                .set('entities', arrToMap(response, ArticleRecord))

        case LOAD_ARTICLE + START:
            return state.setIn(['entities', payload.id, 'loading'], true)

        case LOAD_ARTICLE + SUCCESS:
            return state.setIn(['entities', payload.id], new ArticleRecord(payload.response))
    }

    return state
}