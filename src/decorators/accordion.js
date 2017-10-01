import React, {Component as ReactComponent} from 'react'

export default (OriginalComponent) => class DecoratedComponent extends ReactComponent {
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

    render() {
        return <OriginalComponent {...this.props} openItemId = {this.state.openItemId} toggleItem = {this.toggleItem} currentItem/>
    }
}
