import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import ArticleList from '../ArticleList'
import Article from '../Article'

class ArticlesPage extends Component {
    static propTypes = {

    };

    render() {
        console.log('---', 2)
        return (
            <div>
                <h3>Article List</h3>
                <ArticleList />
                <Route path = '/articles/:id' children = {this.getArticleView}/>
            </div>
        )
    }

    getArticleView = ({ match }) => {
        if (!match) return <h2>Select some article</h2>

        return <Article isOpen id = {match.params.id} key = {match.params.id} />
    }
}

export default ArticlesPage