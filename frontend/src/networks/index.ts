import axios from "axios";
import * as SecureStore from 'expo-secure-store';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://192.168.1.3:8000';

//Directly after login or register
export const setDefaultTokens = async (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await SecureStore.setItemAsync('token', token);
};

//only when user close the app, so I retreive the token, get his/here data and log him/her once data is loaded
export const getAuthToken = async () => {
    const token = await SecureStore.getItemAsync('token');
    return token ? token : "";
};

export const removeAuthToken = async () => {
    await SecureStore.deleteItemAsync('token');
}
export default axios;