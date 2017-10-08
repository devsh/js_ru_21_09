import defaultArticles from '../fixtures'
import {DELETE_ARTICLE, ARTICLE_FILTER_RANGE_CHANGED, ARTICLE_FILTER_SELECTED} from '../constants'

defaultArticles.forEach(article => article.visible = true)

export default (articleState = {
    list: defaultArticles,
    filter: {from: null, to: null, selected: null}
}, action) => {
    const {type, payload} = action
    let { list: articles, filter } = articleState
    let { selected, from, to } = filter

    switch (type) {
        case DELETE_ARTICLE:
            articles = articles.filter(article => article.id !== payload.id)
        case ARTICLE_FILTER_SELECTED:
            filter.selected = selected = payload.selected

            articles = applyFilter(articles, filter)
        case ARTICLE_FILTER_RANGE_CHANGED:
            filter.from = from = payload.from
            filter.to = to = payload.to

            articles = applyFilter(articles, filter)
    }
    
    return {list: articles, filter: {selected, from, to}}
}

function applyFilter(articles, filter) {
    const { from, to, selected } = filter
    const selectedArticlesId = selected ? selected.map(item => item.value) : []

    return articles.map(article => {
        const articleDate = new Date(article.date)
        const visible = (!selected || selected.length === 0 || selectedArticlesId.indexOf(article.id) !== -1) &&
            (!from || articleDate >= from) &&
            (!to || articleDate <= to)
        
        if (visible !== article.visible) {
            let newArticle = {}
            Object.assign(newArticle, article)
            article = newArticle
            article.visible = visible
        }
        
        return article
    })
}