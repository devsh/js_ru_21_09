import React, { Component, PropTypes } from 'react'
import {connect} from 'react-redux'
import {Redirect, NavLink} from 'react-router-dom'
import {loadComments} from '../AC'
import {createCommentsForPageSelector} from '../selectors'
import Loader from './Loader'
import Comment from './Comment'

class AllCommentsList extends Component {
    static propTypes = {
    }

    componentDidMount() {
        const {loaded, loading, loadComments, limit, offset} = this.props

        if (!loaded && !loading) loadComments(offset, limit)
    }

    render() {
        const {loaded, loading, comments, page, path, total, limit} = this.props

        if (loaded && !loading && comments.length === 0) return <div>Page not found</div>
        
        if (!page) return <Redirect to = {`${path}/1`} />

        let pages = []

        for (let i = 1; i <= Math.ceil(total/limit); i++)
            pages.push(<NavLink to = {`${path}/${i}`} activeStyle = {{color: 'red'}}> {i} </NavLink>)
        
        return (
            <div>
                {pages}
                {this.getContent()}
                {pages}
                </div>
        )
    }

    getContent() {
        const {loaded, loading, comments} = this.props

        if (loading) return <Loader />
        if (!loaded) return null

        return (<ul>
                {comments.map(id => <li key = {id}><Comment id = {id} /></li>)}
            </ul>)
    }
}

const createMapStateToProps = () => {
    const commentForPageSelector = createCommentsForPageSelector()

    const mapStateToProps = (state, ownProps) => {
        const {page = 1, limit} = ownProps
        const offset = (page - 1) * limit
        return {
            ...commentForPageSelector(state, {...ownProps, offset}),
            offset
        }
    }

    return mapStateToProps
}

export default connect(createMapStateToProps, {loadComments})(AllCommentsList)

