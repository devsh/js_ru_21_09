import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Article from './Article'
import Loader from './Loader'
import Accordion from './Accordion'
import {connect} from 'react-redux'
import {filtratedArticlesSelector} from '../selectors'
import {loadAllArticles} from '../AC'

class ArticleList extends Accordion {
    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
            error: null
        }
    }

    componentDidMount() {
        this.props.loadAllArticles()
    }

    render() {
        console.log('---', 'rerendering ArticleList')
        const {articles, loading} = this.props
        if (loading) return <Loader />
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

export default connect(state => {
    console.log('---', 'connect for ArticleList')
    return {
        articles: filtratedArticlesSelector(state),
        loading: state.articles.loading
    }
}, { loadAllArticles })(ArticleList)