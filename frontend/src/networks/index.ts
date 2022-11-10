import axios from "axios";

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = 'http://192.168.1.3:8000';

export default axios;