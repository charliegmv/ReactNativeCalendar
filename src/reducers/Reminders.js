export const reducer = (state = {
	reminders: []
}, action = {}) => {
	switch (action.type) {
		case "SET_REMINDER":
            return { ...state, reminders: [...state.reminders, action.reminder] }
		default:
			return state
	}
}