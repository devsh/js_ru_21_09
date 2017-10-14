import {  } from '../constants'
import {normalizedComments} from '../fixtures'

const commentsMap = normalizedComments.reduce((acc, article) => {
    return {...acc, [article.id]: article}
}, {})

export default (commentsState = commentsMap, action) => {
    const { type, payload, response, error } = action

    switch (type) {

    }

    return commentsState
}