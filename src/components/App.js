import React, {Component} from 'react'
import {Route, NavLink} from 'react-router-dom'
import ArticlesPage from './routes/ArticlesPage'
import CommentsPage from './routes/CommentsPage'
import Filters from './Filters'
import Counter from './Counter'

class App extends Component {
    state = {
        username: ''
    }

    render() {
        const {username} = this.state

        return (
            <div>
                <h1>App name</h1>
                <ul>
                    <li><NavLink to = '/articles' activeStyle = {{color: 'red'}}>articles</NavLink></li>
                    <li><NavLink to = '/filters' activeStyle = {{color: 'red'}}>filters</NavLink></li>
                    <li><NavLink to = '/counter' activeStyle = {{color: 'red'}}>counter</NavLink></li>
                    <li><NavLink to = '/comments' activeStyle = {{color: 'red'}}>all comments</NavLink></li>
                </ul>
                User: <input type = 'text' value = {username} onChange = {this.handleUserChange}/>
                <Route path = '/counter' component = {Counter} />
                <Route path = '/filters' component = {Filters} />
                <Route path = '/articles' component = {ArticlesPage} />
                <Route path = '/comments' component = {CommentsPage} />
            </div>
        )
    }

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