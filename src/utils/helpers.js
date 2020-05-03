export const sortReminders = (reminders) => (
    reminders.sort((a,b) => {
        const dateA = new Date(a.datetime)
        const dateB = new Date(b.datetime)

        if(dateA > dateB) return 1
        else if(dateA < dateB) return -1
        return 0
    })
)