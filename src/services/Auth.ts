import axios from 'axios';

interface UserForAuth {
    username: string;
    password: string;
}

const url = "https://localhost:7252/api/authentication";
// const url = "https://aisoftcalculator.azurewebsites.net/api/authentication"

const authenticate = (userForAuth: UserForAuth) => {
    const request = axios.post(url, userForAuth);
    return request.then(response => response);
};

const LoginService = {
    authenticate: authenticate
};

export default LoginService;