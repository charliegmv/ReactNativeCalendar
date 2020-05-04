import moment from 'moment'

export const sortReminders = (reminders) => (
    reminders.sort((a,b) => {
        const dateA = new Date(a.datetime)
        const dateB = new Date(b.datetime)

        if(dateA > dateB) return 1
        else if(dateA < dateB) return -1
        return 0
    })
)

export const nextMultipleOf3Hour = (date) => {
    const actualHour = parseInt(moment(date).format("HH"))
    const diff = 3 - actualHour%3
    return moment(date).add(diff, 'h').startOf('hour')
}