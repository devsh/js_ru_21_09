import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Article from './Article'

class ArticleList extends Component {
    state = {
        openArticleId: null
    }

    render() {
        const {articles} = this.props
        if (!articles.length) return <h3>No Articles</h3>
        const articleElements = articles.map((article) => <li key={article.id}>
            <Article article={article}
                     isOpen={article.id === this.state.openArticleId}
                     onButtonClick={this.toggleArticle(article.id)}
            />
        </li>)
        return (
            <ul>
                {articleElements}
            </ul>
        )
    }

    toggleArticle = (openArticleId) => {
        if (this.memoized.get(openArticleId)) return this.memoized.get(openArticleId)
        const func = (ev) => {
            this.setState({
                openArticleId: this.state.openArticleId === openArticleId ? null : openArticleId
            })
        }

        this.memoized.set(openArticleId, func)

        return func
    }

    memoized = new Map()
}


ArticleList.defaultProps = {
    articles: []
}

ArticleList.propTypes = {
    articles: PropTypes.array.isRequired
}

export default ArticleList