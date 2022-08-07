import { applyMiddleware, combineReducers, createStore } from "redux";
import {excahngeReducer} from './exchangeRateReducer'
import thunkMidleWare from 'redux-thunk'
const reducers = combineReducers({
    excahngeReducer
})

const store = createStore(reducers, applyMiddleware(thunkMidleWare))
window.store = store
export default store