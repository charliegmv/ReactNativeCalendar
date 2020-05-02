import moment from 'moment'

export const reducer = (state = {
	reminders: {}
}, action = {}) => {
	switch (action.type) {
		case "SET_REMINDERS": {
			const reminders = {}
			action.reminders.forEach(r => {
				const date = moment(r.datetime).format('YYYY-MM-DD')
				reminders[date] ? reminders[date].push(r) : reminders[date] = [r]
			})
			return { ...state, reminders }
		}
		case 'NEW_REMINDER': {
			const reminders = JSON.parse(JSON.stringify(state.reminders))
			const newReminder = action.reminder
			const date = moment(newReminder.datetime).format('YYYY-MM-DD')
			reminders[date] ? reminders[date].push(newReminder) : reminders[date] = [newReminder]
			return { ...state, reminders }
		}
		default:
			return state
	}
}