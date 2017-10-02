import React, { Component } from 'react'
import PropTypes from 'prop-types'

class ArticlesChart extends Component {
    static propTypes = {

    };

    componentDidMount() {
        //this.refs.container
        //do some d3 charting with this.refs.container
    }

    componentWillReceiveProps(nextProps) {
        //do some update
    }

    componentWillUnmount() {
        //do some cleanup
    }

    render() {
        return <div ref = 'container' />
    }
}

export default ArticlesChart