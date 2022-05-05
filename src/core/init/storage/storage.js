import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

function clear() {
    if (Platform.OS === 'android') {
        return AsyncStorage.clear();
    }
    return AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
}

function get(key, defaultValue = null) {
    return AsyncStorage.getItem(key).then((value) => {
        try {
            if (value !== null) {
                const parsedValue = JSON.parse(value);
                return parsedValue;
            }
            return defaultValue;
        } catch (e) {
            return value || defaultValue;
        }
    });
}

function set(key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value));
}

function remove(key) {
    return AsyncStorage.removeItem(key);
}

function multiGet(...keys) {
    return AsyncStorage.multiGet([...keys]).then((stores) => {
        const data = {};
        stores.forEach((result, i, store) => {
            data[store[i][0]] = JSON.parse(store[i][1]);
        });
        return data;
    });
}

function multiRemove(...keys) {
    return AsyncStorage.multiRemove([...keys]);
}

export default {
    clear,
    get,
    set,
    remove,
    multiGet,
    multiRemove,
};
