import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Route, NavLink, Switch, Redirect} from 'react-router-dom'
import ArticlesPage from './routes/ArticlesPage'
import CommentsPage from './routes/CommentsPage'
import Filters from './Filters'
import Counter from './Counter'
import Menu, {MenuItem} from './Menu'


class App extends Component {
    static contextTypes = {
        translation: PropTypes.object
    }

    state = {
        username: ''
    }

    render() {
        const {username} = this.state
        const {translation} = this.context

        return (
            <div>
                <h1>{translation['app.name']}</h1>
                <Menu>
                    <MenuItem to = '/articles'>{translation['app.articles']}</MenuItem>
                    <MenuItem to = '/filters'>{translation['app.filters']}</MenuItem>
                    <MenuItem to = '/counter'>{translation['app.counter']}</MenuItem>
                    <MenuItem to = '/comments/1'>{translation['app.comments']}</MenuItem>
                </Menu>
                {translation['app.user']}: <input type = 'text' value = {username} onChange = {this.handleUserChange}/>
                <Switch>
                    {/*<Redirect from = '/' exact to = '/articles'/>*/}
                    <Route path = '/counter' component = {Counter} exact />
                    <Route path = '/filters' component = {Filters} />
                    <Route path = '/articles/new' render = {this.newArticlePage} />
                    <Route path = '/articles' component = {ArticlesPage} />
                    <Route path = '/comments' component = {CommentsPage}/>
                    <Route path = '*' render = {this.notFound} />
                </Switch>
            </div>
        )
    }

    notFound = () => <h1>Not Found</h1>

    newArticlePage = () => <h1>New Article Page</h1>

    handleUserChange = ev => {
        if (ev.target.value.length > 10) return this.setState({
            username: ''
        })

        this.setState({
            username: ev.target.value
        })
    }
}

export default App