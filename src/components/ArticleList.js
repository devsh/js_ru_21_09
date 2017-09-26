import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Article from './Article'

class ArticleList extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    }

    static defaultProps = {
        articles: []
    }

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

    toggleArticle = (openArticleId) => (ev) => {
        this.setState({
            openArticleId: openArticleId === this.state.openArticleId ? null : openArticleId
        })
    }
}

export default ArticleList