import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CommentList extends Component {
    static propTypes = {
        comments: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            user: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired
        })).isRequired
    }

    state = {
        isOpen: false
    }

    render() {
        const {comments} = this.props
        const {isOpen} = this.state
        const commentsElement = comments.map(comment =>
            (<li key={comment.id}>
                <h3>{comment.user}</h3>
                {comment.text}
            </li>));
        const commentsListElement = isOpen ? <ul>{commentsElement}</ul> : null

        return (
            <div>
                <h2>Comments:</h2>
                <button onClick={this.toggleComments}>
                    { isOpen ? 'hide' : 'show' }
                </button>
                {commentsListElement}
            </div>
        );
    }

    toggleComments = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
}

export default CommentList;
