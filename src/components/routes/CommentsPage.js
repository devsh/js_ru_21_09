import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import AllCommentsList from '../AllCommentsList'

class CommentsPage extends Component {
    render() {
        const { location: { pathname }} = this.props
        
        if (pathname === '/comments') return <Redirect to = '/comments/1' />

        return (
            <div>
                <Route path = '/comments/:page' children = { this.renderPage }/>
            </div>
        )
    }

    renderPage = ({ match }) => {
        let page = match ? match.params.page : undefined

        return (<AllCommentsList page = { page } limit = {5} path="/comments" key = { page }/>)
    }
}

export default CommentsPage
