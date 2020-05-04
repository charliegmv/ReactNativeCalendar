import AsyncStorage from '@react-native-community/async-storage';
import { saveReminder } from '../src/actions/Storage';

const reminderObject = {
    id: '12345',
    title: "Go to doctor",
    datetime: new Date(),
    color: "#fff",
    city: "Guayaquil"
}

jest.mock('@react-native-community/async-storage', () => ({
	setItem: jest.fn(() => {
		return new Promise(resolve => resolve(null) );
	})
}));

describe('new reminder', () => {
    it('correct params', () => {
        const saveReminder = jest.fn(() => new Promise(resolve => resolve(null)))
        saveReminder(reminderObject).then(() => {
            expect(reminderObject).toBe(
                expect.objectContaining({
                    id: expect.any(String),
                    title: expect.any(String),
                    datetime: expect.any(Date),
                    color: expect.any(String),
                    city: expect.any(String),
                }),
            )
        })
    });

    it('created successfully', () => {
        return saveReminder(reminderObject.id, reminderObject, 'create').then(({ error, status }) => {
            expect(status).toBe(200)
            expect(error).toBeUndefined()
            expect(AsyncStorage.setItem).toBeCalledWith(reminderObject.id, JSON.stringify(reminderObject))
        })
    });
});