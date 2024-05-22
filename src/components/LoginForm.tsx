import React, { useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import LoginService from '../services/Auth';

const LoginForm = ( { setLoggedUser }) => {
    // const { register, handleSubmit } = useForm();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const user = { username, password };
            const response = await LoginService.authenticate(user);
            console.log('Authentication response:', response);
            console.log('Response data:', response.data);
            if (response.status === 200) {
                console.log('Authentication successful');
                console.log('Username:', response.data.userName);
                localStorage.setItem("username", response.data.userName)
                localStorage.setItem("token", response.data.token)
                setLoggedUser(response.data.userName)
            }
        } catch (error) {
            console.log('Authentication error:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className="login-form">
            <Typography variant="h3" component="div" className="custom-typography">Kirjaudu</Typography>
            <TextField
                className='form-textfield'
                label="Käyttäjätunnus"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <TextField
                className='form-textfield'
                label="Salasana"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button className='loginBtn' type="submit">Kirjaudu</button>
        </Box>
    );
};

export default LoginForm;
