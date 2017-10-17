const uuid = require('uuid/v4')

export default store => next => action => {
    const { payload } = action
    if (payload.idReceiver)
        payload.idReceiver.call(payload, uuid())
    
    next(action)
}
