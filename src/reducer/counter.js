import {INCREMENT} from '../constants'

export default function counterReducer(state = 10, action) {
    return action.type === INCREMENT ? state + 1 : state
}