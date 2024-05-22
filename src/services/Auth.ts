import axios from 'axios';

const url = "https://localhost:7252/api/authentication";

const authenticate = (userForAuth) => {
    const request = axios.post(url, userForAuth);
    return request.then(response => response);
};

const LoginService = {
    authenticate: authenticate
};

export default LoginService;