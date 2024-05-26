import React, { useContext, useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import LoginService from '../services/Auth';

interface LoginFormProps {
    setLoggedUser: React.Dispatch<React.SetStateAction<string>>;
    onClose: () => void;
    setSelectedTab: (value: number) => void;
    setLoginId: React.Dispatch<React.SetStateAction<number>>;
  }

const LoginForm: React.FC<LoginFormProps> = ( { setLoggedUser, onClose, setSelectedTab, setLoginId }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            const user = { username, password };
            const response = await LoginService.authenticate(user);
            if (response.status === 200) {
                localStorage.setItem("username", response.data.userName)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("loginid", response.data.loginId)
                setLoggedUser(response.data.userName)
                setLoginId(response.data.loginId)
                onClose()
                setSelectedTab(4);
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
