import AsyncStorage from '@react-native-community/async-storage'

export const setReminder = async (key, data) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(data))
        return { status: 200 }
    } catch(error) { return ({ error }) }
}

export const fetchReminders = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys()
        const storage = await AsyncStorage.multiGet(keys)
        const reminders = storage.map(pair => JSON.parse(pair[1]))
        return { reminders }
    } catch (error) { return ({ error }) }
}