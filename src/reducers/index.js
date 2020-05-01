import { combineReducers } from 'redux'
import { reducer as remindersReducer } from './Reminders'

export default combineReducers({
	reminders: remindersReducer
})