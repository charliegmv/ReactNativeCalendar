export const reducer = (state = {
	reminders: []
}, action = {}) => {
	switch (action.type) {
		case "SET_REMINDER":
			return { ...state, reminders: [...state.reminders, action.reminder] }
		case "SET_ALL_REMINDERS":
            return { ...state, reminders: action.reminders }
		default:
			return state
	}
}