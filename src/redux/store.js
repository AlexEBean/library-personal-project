import {combineReducers, createStore} from 'redux'
import reducer from './authReducer'
import holdReducer from "./holdReducer"

const rootReducer = combineReducers({
    reducer,
    holdReducer
})

export default createStore(rootReducer)

