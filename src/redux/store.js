import {combineReducers, createStore} from 'redux'
import reducer from './authReducer'
import holdReducer from "./holdReducer"
import userReducer from "./userReducer"

const rootReducer = combineReducers({
    reducer,
    holdReducer,
    userReducer
})

export default createStore(rootReducer)

