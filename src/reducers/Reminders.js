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
		case "NEW_REMINDER": {
			const reminders = JSON.parse(JSON.stringify(state.reminders))
			const newReminder = action.reminder
			const date = moment(newReminder.datetime).format('YYYY-MM-DD')
			reminders[date] ? reminders[date].push(newReminder) : reminders[date] = [newReminder]
			return { ...state, reminders }
		}
		case "UPDATE_REMINDER": {
			const reminders = JSON.parse(JSON.stringify(state.reminders))
			const updatedReminder = action.reminder

			const oldDate = moment(action.oldDate).format("YYYY-MM-DD")
			const oldReminder_index = reminders[oldDate].findIndex(r => r.id === updatedReminder.id)
			reminders[oldDate].splice(oldReminder_index, 1)

			const newDate = moment(updatedReminder.datetime).format("YYYY-MM-DD")
			reminders[newDate] ? reminders[newDate].push(updatedReminder) : reminders[newDate] = [updatedReminder]

			return { ...state, reminders }
		}
		case "DELETE_REMINDER": {
			const reminders = JSON.parse(JSON.stringify(state.reminders))
			const delReminder = action.reminder
			const date = moment(delReminder.datetime).format("YYYY-MM-DD")
			const delReminder_index = reminders[date].findIndex(r => r.id === delReminder.id)
			reminders[date].splice(delReminder_index, 1)
			return { ...state, reminders }
		}
		case "DELETE_ALL_REMINDERS": {
			const reminders = JSON.parse(JSON.stringify(state.reminders))
			const date = moment(action.date).format("YYYY-MM-DD")
			delete reminders[date]
			return { ...state, reminders }
		}
		default:
			return state
	}
}