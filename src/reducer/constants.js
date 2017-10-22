import {Record, OrderedMap} from 'immutable'

export const ReducerRecord = Record({
    entities: new OrderedMap({}),
    loading: false,
    loaded: false
})
