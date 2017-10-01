import React, {Component} from 'react'

class Accordion extends Component {
    state = {
        openItemId: null
    }

    memoized = new Map()

    toggleItem = (openItemId) => {
        if (this.memoized.get(openItemId)) return this.memoized.get(openItemId)

        const innerToggleItem = (ev) => {
            this.setState({
                openItemId: this.state.openItemId === openItemId ? null : openItemId
            })
        }

        this.memoized.set(openItemId, innerToggleItem)

        return innerToggleItem
    }
}

export default Accordion
