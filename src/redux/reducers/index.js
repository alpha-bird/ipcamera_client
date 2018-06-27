import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import * as globals from './globals/reducers'

const reducers = combineReducers({
    globals : globals.reducers,
    routing : routerReducer
})

export default reducers