import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Article from './Article'
import accordion from '../decorators/accordion'
import Accordion from './base/Accordion'

class ArticleList extends Component {
    render() {
        const {openItemId: openArticleId, toggleItem: toggleArticle} = this.props // for decorator
        //const [openArticleId, toggleArticle] = [this.state.openItemId, this.toggleItem] // for inherit

        const {articles} = this.props
        if (!articles.length) return <h3>No Articles</h3>
        const articleElements = articles.map((article) => <li key={article.id}>
            <Article article={article}
                     isOpen={article.id === openArticleId}
                     onButtonClick={toggleArticle(article.id)}
            />
        </li>)
        return (
            <ul>
                {articleElements}
            </ul>
        )
    }
}


ArticleList.defaultProps = {
    articles: []
}

ArticleList.propTypes = {
    articles: PropTypes.array.isRequired
}

export default accordion(ArticleList)