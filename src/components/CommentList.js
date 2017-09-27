import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            user: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        }))
    }

    state = {
        isOpen: false
    }

    render() {
        const {comments} = this.props
        const {isOpen} = this.state
        const commentsListElement = isOpen && comments ? (<ul>
            {comments.map(comment =>
                (<li key={comment.id}>
                    <h3>{comment.user}</h3>
                    {comment.text}
                </li>))}
        </ul>) : null
        const commentsContent = comments && comments.lenght ? (
            <section>
                <button onClick={this.toggleComments}>
                    { isOpen ? 'hide' : 'show' }
                </button>
                {commentsListElement}
            </section>) : 'no comments'

        return (
            <div>
                <h2>Comments:</h2>
                {commentsContent}
            </div>
        )
    }

    toggleComments = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

export default CommentList;
