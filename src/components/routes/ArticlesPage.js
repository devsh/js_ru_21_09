import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Route} from 'react-router-dom'
import ArticleList from '../ArticleList'
import Article from '../Article'

class ArticlesPage extends Component {
    static propTypes = {

    };

    static contextTypes = {
        translation: PropTypes.object
    }

    render() {
        console.log('---', 2)
        const {translation} = this.context
        return (
            <div>
                <h3>{translation['articles.articleList']}</h3>
                <ArticleList />
                <Route path = '/articles/:id' children = {this.getArticleView}/>
            </div>
        )
    }

    getArticleView = ({ match }) => {
        const {translation} = this.context
        if (!match) return <h2>{translation['articles.selectSomeArticle']}</h2>

        return <Article isOpen id = {match.params.id} key = {match.params.id} />
    }
}

export default ArticlesPage