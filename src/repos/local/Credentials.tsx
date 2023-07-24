import AsyncStorage from '@react-native-async-storage/async-storage'

const SESSION_TOKEN = 'SESSION_TOKEN';

async function saveTokenToStorage(token: string) {
    console.log('token :>> ', token);
    try {
        await AsyncStorage.setItem(SESSION_TOKEN, token);
    } catch (e) {
        console.error('Save token: Failed to save token');
    }
}

async function loadTokenToStorage() {
    try {
        const token = await AsyncStorage.getItem(SESSION_TOKEN);
        console.log("token", token);
        return token;
    } catch (e) {
        return '';
    }
}

export default {
    saveTokenToStorage,
    loadTokenToStorage
}