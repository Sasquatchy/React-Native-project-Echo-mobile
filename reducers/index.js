import memberReducer from './memberReducer'
import {combineReducers} from 'redux'
const rootReducer = combineReducers({memberReducer})
export default rootReducer