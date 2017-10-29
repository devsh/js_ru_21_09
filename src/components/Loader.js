import React from 'react'
import PropTypes from 'prop-types'

function Loader(props, {translation}) {
    return (
        <h3>
            {translation['loader.title']}...
        </h3>
    )
}

Loader.propTypes = {
}

Loader.contextTypes = {
    translation: PropTypes.object
}

export default Loader