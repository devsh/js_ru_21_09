import {createSelector} from 'reselect'

export const filtersSelector = state => state.filters
export const articlesMapSelector = state => state.articles.entities
export const commentsSelector = state => state.comments.entities
export const idSelector = (_, props) => props.id

export const articlesSelector = createSelector(articlesMapSelector, articles => articles.valueSeq().toArray())

export const filtratedArticlesSelector = createSelector(articlesSelector, filtersSelector, (articles, filters) => {
    const {selected, dateRange: {from, to}} = filters
    console.log('---', 'recomputing filtration')

    return articles.filter(article => {
        const published = Date.parse(article.date)
        return (!selected.length || selected.includes(article.id)) &&
            (!from || !to || (published > from && published < to))
    })
})

export const createCommentSelector = () => {
    return createSelector(commentsSelector, idSelector, (comments, id) => {
        console.log('---', 'comment selector', id)
        return comments.get(id)
    })
}

export const pageSelector = (_, {offset, limit}) => ({offset, limit})
export const loadedCommentsSelector = state => state.comments.loadedEntities
export const loadingCommentsSelector = state => state.comments.loadingEntities
export const countCommentsSelector = state => state.comments.count
export const createCommentsForPageSelector = () => {
    return createSelector(loadingCommentsSelector, loadedCommentsSelector, countCommentsSelector, pageSelector,
        (loadingComments, loadedComments, count, {offset, limit}) => {
            const comments = loadedComments.toJS().slice(offset, offset + limit)

            return {
                comments,
                loading: loadingComments
                    .toJS()
                    .slice(offset, offset + limit)
                    .some(item => item),
                loaded: comments.every(item => item) && count !== null && !(comments.length === 0 && count > offset),
                total: count
            }
    })
}