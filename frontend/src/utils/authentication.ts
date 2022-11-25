import * as SecureStore from 'expo-secure-store';
import { t } from 'i18next';
import AlertAsync from "react-native-alert-async";

//Return Auth Token
export const getAuthToken = async () => {
    const token = await SecureStore.getItemAsync('token');
    return token ? token : "";
};

//Set Auth Token
export const setAuthToken = async (token: string) => {
    try {
        await SecureStore.setItemAsync('token', token);
    }
    catch (err) {
        console.log(err);
    }
}

//User Logout by removing Authtoken and returning Boolean Success
export const logoutUser = async () => {
    await SecureStore.deleteItemAsync('token');
    return true;
}
