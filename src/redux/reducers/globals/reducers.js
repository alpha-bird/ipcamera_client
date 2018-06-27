import ActionTypes from './types'

const initialState = {
    isInstalled : false
}

export function reducers( state = initialState, action ) {
    switch(action.type) {
        case ActionTypes.CHECK_CARRIERSERVICE_REQUEST:
            return { ...state }
        case ActionTypes.CHECK_CARRIERSERVICE_SUCCESSED:
            return { ...state }
        case ActionTypes.CHECK_CARRIERSERVICE_FAILED:
            return { ...state }
        default:
            return state
    }
}