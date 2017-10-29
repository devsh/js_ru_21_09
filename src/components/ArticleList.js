import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {NavLink} from 'react-router-dom'
import Article from './Article'
import Loader from './Loader'
import Accordion from './Accordion'
import {connect} from 'react-redux'
import {filtratedArticlesSelector} from '../selectors'
import {checkAndLoadAllArticles} from '../AC'

class ArticleList extends Accordion {
    static contextTypes = {
        translation: PropTypes.object
    }

    constructor(props) {
        super(props)

        this.state = {
            ...this.state,
            error: null
        }
    }

    componentDidMount() {
        const {checkAndLoadAllArticles } = this.props
        checkAndLoadAllArticles()
    }

    render() {
        console.log('---', 'rerendering ArticleList')
        const {articles, loading} = this.props
        const {translation} = this.context

        if (loading) return <Loader />
        if (this.state.error) return <h2>{translation['articles.error']}: {this.state.error.message}</h2>
        if (!articles.length) return <h3>{translation['articles.noArticles']}</h3>

        const articleElements = articles.map((article) => <li key={article.id}>
            <NavLink to = {`/articles/${article.id}`} activeStyle = {{color: 'red'}}>
                {article.title}
            </NavLink>
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
        loading: state.articles.loading,
        router: state.router
    }
}, { checkAndLoadAllArticles }, null, { pure: true })(ArticleList)