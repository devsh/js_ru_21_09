import React, {Component, PureComponent} from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import PropTypes from 'prop-types'
import CommentList from '../CommentList'
import Loader from '../Loader'
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import {deleteArticle, loadArticle} from '../../AC'
import './style.css'

class Article extends PureComponent {
    static defaultProps = {

    }

    static propTypes = {
        id: PropTypes.string.isRequired,
        isOpen: PropTypes.bool,
        onClick: PropTypes.func,
        //from connect
        article: PropTypes.shape({
            title: PropTypes.string.isRequired,
            text: PropTypes.string,
            date: PropTypes.string.isRequired
        }).isRequired,
    }

    state = {
        clicked: 0
    }

    componentDidMount() {
        const {isOpen, id, loadArticle} = this.props
        if (isOpen) loadArticle(id)
    }

    render() {
        const {article, isOpen, onButtonClick} = this.props
        if (!article) return null

        if (this.state.clicked > 3) throw new Error('clicked more then 3 times')

        return (
            <div>
                <h2 ref = {this.setHeaderRef}>
                    {article.title}
                    <span onClick = {this.increment}>Clicked: {this.state.clicked} times</span>
                    <button onClick = {this.handleDelete}>delete me</button>
                </h2>
                <ReactCSSTransitionGroup
                    transitionName = 'article'
                    transitionEnterTimeout = {500}
                    transitionLeaveTimeout = {300}
                    component = 'div'
                >
                    {this.getBody()}
                </ReactCSSTransitionGroup>
                <h3>creation date: {(new Date(article.date)).toDateString()}</h3>
            </div>
        )
    }

    getBody() {
        const {isOpen, article} = this.props

        if (!isOpen) return null
        if (article.loading) return <Loader />

        return (
            <div>
                <section>{article.text}</section>
                <CommentList article = {article} ref = {this.setCommentsRef} key = {this.state.clicked}/>
            </div>
        )
    }

    setHeaderRef = header => {
        this.header = header
//        console.log('---', this.header)
    }

    setCommentsRef = comments => {
        this.comments = comments
/*
        setTimeout(() => {
            this.comments.forceUpdate()
        }, 500)
*/
//        console.log('---', 'comments', comments, findDOMNode(comments))
    }

    increment = () => this.setState({
        clicked: this.state.clicked + 1
    })

    handleDelete = () => {
        console.log('---', 'deleting')
        this.props.deleteArticle(this.props.article.id)
    }
}


export default connect((state, { id }) => ({
    article: state.articles.getIn(['entities', id])
}), { deleteArticle, loadArticle })(Article)