export const setReminders = (reminders) => ({ type: "SET_REMINDERS", reminders })
export const saveReminder = (reminder, type, oldDate) => ({ 
    type: type === 'create' ? "NEW_REMINDER" : "UPDATE_REMINDER", 
    reminder, 
    oldDate 
})