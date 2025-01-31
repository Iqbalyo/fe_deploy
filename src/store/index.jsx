import { createStore, applyMiddleware, compose} from 'redux'
import { thunk } from 'redux-thunk'
import  reducer  from "./reducer/index"

const store = (initialState = {}) => createStore(reducer, compose(applyMiddleware(thunk)))
export default store