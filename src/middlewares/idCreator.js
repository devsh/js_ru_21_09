const uuid = require('uuid/v4')

export default store => next => action => {
    const { payload } = action
    if (payload.neededIdObject)
        action.payload[payload.neededIdObject].id = uuid()
    
    next(action)
}
