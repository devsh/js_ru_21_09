import {normalizedArticles} from '../fixtures'
import {DELETE_ARTICLE, ADD_COMMENT} from '../constants'

const articlesMap = normalizedArticles.reduce((acc, article) => {
    return {...acc, [article.id]: article}
}, {})

export default (articleState = articlesMap, action) => {
    const {type, payload} = action
    let newArticleState = articleState
    
    switch (type) {
        case DELETE_ARTICLE:
            newArticleState = {...articleState}
            delete newArticleState[payload.id]
        
        case ADD_COMMENT:
            newArticleState = {...articleState}
            const { articleId, comment } = payload
            
            newArticleState[articleId] = {...newArticleState[articleId]}
            newArticleState[articleId].comments.push(comment.id)
            
    }
    return newArticleState
}