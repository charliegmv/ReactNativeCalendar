import AsyncStorage from '@react-native-community/async-storage'

export const fetchReminders = async () => {
    try {
        const keys = await AsyncStorage.getAllKeys()
        const storage = await AsyncStorage.multiGet(keys)
        const reminders = storage.map(pair => JSON.parse(pair[1]))
        return { reminders }
    } catch (error) { return ({ error }) }
}

export const saveReminder = async (key, data, type) => {
    try {
        const saveItem = type === 'create' ? AsyncStorage.setItem : AsyncStorage.mergeItem
        await saveItem(key, JSON.stringify(data))
        return { status: 200 }
    } catch(error) { return ({ error }) }
}

export const deleteReminders = async (keys) => {
    try {
        await AsyncStorage.multiRemove(keys)
        return { status: 200 }
    } catch(error) { return ({ error }) }
}