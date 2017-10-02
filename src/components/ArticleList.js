import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Article from './Article'
import Accordion from './Accordion'

class ArticleList extends Accordion {
    state = {
        error: null
    }

    render() {
        const {articles} = this.props
        if (this.state.error) return <h2>Error: {this.state.error.message}</h2>
        if (!articles.length) return <h3>No Articles</h3>

        const articleElements = articles.map((article) => <li key={article.id}>
            <Article article={article}
                     isOpen={article.id === this.state.openItemId}
                     onButtonClick={this.toggleOpenItemMemoized(article.id)}
            />
        </li>)
        return (
            <ul>
                {articleElements}
            </ul>
        )
    }

    componentDidCatch(error, info) {
        console.log('---', 123, error, info)
        this.setState({ error })
    }
}


ArticleList.defaultProps = {
    articles: []
}

ArticleList.propTypes = {
    articles: PropTypes.array.isRequired
}

export default ArticleList