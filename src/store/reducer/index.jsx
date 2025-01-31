import { combineReducers } from 'redux'
import data from './userData.reducer'

const appReducer = combineReducers({
    data
})

const rootReducer = (state, action) => appReducer(state, action)
export default rootReducer