import AsyncStorage from '@react-native-async-storage/async-storage'

const SESSION_TOKEN = 'SESSION_TOKEN';

async function saveToken(token: string) {
    try {
        await AsyncStorage.setItem(SESSION_TOKEN, token);
    } catch (e) {
        console.error('Save token: Failed to save token');
    }
}

async function loadToken() {
    try {
        const token = await AsyncStorage.getItem(SESSION_TOKEN);
        console.log("token", token);
        return token;
    } catch (e) {
        return '';
    }
}

export default {
    saveToken,
    loadToken
}