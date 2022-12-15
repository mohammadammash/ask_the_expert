import axios from "axios";
import { setAuthToken } from "../utils/authentication";

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://192.168.1.3:8000';

//Directly after login or register
export const setDefaultTokens = async (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    await setAuthToken(token);
};

export default axios;