import {INCREMENT, DELETE_ARTICLE, ARTICLE_FILTER_RANGE_CHANGED, ARTICLE_FILTER_SELECTED} from '../constants'

export function increment() {
    const action = {
        type: INCREMENT
    }

    return action
}

export function deleteArticle(id) {
    return {
        type: DELETE_ARTICLE,
        payload: { id }
    }
}

export function articleFilterSelected(selected) {
    return {
        type: ARTICLE_FILTER_SELECTED,
        payload: { selected }
    }
}

export function articleFilterRangeChanged(range) {

    return {
        type: ARTICLE_FILTER_RANGE_CHANGED,
        payload: range
    }
}