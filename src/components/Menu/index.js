import React, { Component } from 'react'
import PropTypes from 'prop-types'
import MenuItem from './MenuItem'

class Menu extends Component {
    static propTypes = {

    };

    static contextTypes = {
        translation: PropTypes.object
    }

    render() {
        const {translation} = this.context
        return (
            <div>
                <h2>{translation['menu.title']}</h2>
                {this.props.children}
            </div>
        )
    }
}

export {MenuItem}
export default Menu