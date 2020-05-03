export const setReminders = (reminders) => ({ type: "SET_REMINDERS", reminders })
export const saveReminder = (reminder, type, oldDate) => ({ 
    type: type === 'create' ? "NEW_REMINDER" : "UPDATE_REMINDER", 
    reminder, 
    oldDate 
})
export const deleteReminder = (reminder) => ({ type: "DELETE_REMINDER", reminder })
export const deleteAllReminders = (date) => ({ type: "DELETE_ALL_REMINDERS", date })