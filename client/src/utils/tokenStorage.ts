// src/utils/tokenStorage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeToken = async (key: string, token: string) => {
    try {
        await AsyncStorage.setItem(key, token);
        return true;
    } catch (error) {
        console.error('Error storing token:', error);
        return false;
    }
};

export const getToken = async (key: string): Promise<string | null> => {
    try {
        return await AsyncStorage.getItem(key);
    } catch (error) {
        console.error('Error getting token:', error);
        return null;
    }
};

export const removeToken = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    } catch (error) {
        console.error('Error removing token:', error);
        return false;
    }
};
