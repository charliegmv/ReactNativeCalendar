import AsyncStorage from '@react-native-community/async-storage'

export const setReminder = async (key, data) => {
    try {
        const reminder = await AsyncStorage.setItem(key, JSON.stringify(data))
        return { reminder }
    } catch(error) { return ({ error }) }
}

export const getAllReminders = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys()
        const storage = await AsyncStorage.multiGet(keys)
        const reminders = storage.map(pair => JSON.parse(pair[1]))
        return { reminders }
    } catch (error) { return ({ error }) }
}