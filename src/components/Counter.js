import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {increment} from '../AC'

class Counter extends Component {
    static propTypes = {

    };

    static contextTypes = {
        translation: PropTypes.object
    }

    render() {
        const {translation} = this.context
        return (
            <div>
                <h3>
                    {translation['count.title']}: {this.props.count}
                    <button onClick = {this.handleIncrement}>
                        {translation['count.increment']}
                    </button>
                </h3>
            </div>
        )
    }

    handleIncrement = () => {
        const action = increment()
        this.props.dispatch(action)
    }
}

const mapStateToProps = (state) => ({
    count: state.counter
})

export default connect(mapStateToProps)(Counter)