import { ADD_COMMENT } from '../constants'
import {normalizedComments} from '../fixtures'

const commentsMap = normalizedComments.reduce((acc, article) => {
    return {...acc, [article.id]: article}
}, {})

export default (commentsState = commentsMap, action) => {
    const { type, payload, response, error } = action

    switch (type) {
        case ADD_COMMENT:
            commentsState = {...commentsState}
            const { comment } = payload
            commentsState[comment.id] = comment
    }

    return commentsState
}