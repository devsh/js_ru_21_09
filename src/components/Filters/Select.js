import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import {connect} from 'react-redux'
import {articleFilterSelected} from '../../AC'

import 'react-select/dist/react-select.css'

class SelectFilter extends Component {
    static propTypes = {
        articles: PropTypes.array.isRequired
    };

    handleChange = selected => this.props.articleFilterSelected(selected)

    render() {
        const { articles } = this.props
        const options = articles.map(article => ({
            label: article.title,
            value: article.id
        }))

        return <Select
            options={options}
            value={this.props.selected}
            multi={true}
            onChange={this.handleChange}
        />
    }
}

export default connect((state) => {
    return {
        selected: state.articles.filter.selected,
        articles: state.articles.list
    }
}, {
    articleFilterSelected
})(SelectFilter)