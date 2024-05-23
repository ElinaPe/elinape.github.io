import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import UserService from '../services/UsersService';

interface AddUserFormProps {
    onBack: () => void; 
}

const AddUserForm: React.FC<AddUserFormProps> = ({onBack}) => {
    const [newName, setNewName] = useState('')
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        try {
            const response = await UserService.createNewUser(newName, newUsername, newPassword);
            console.log('User addition response:', response);
            onBack()
        } catch (error) {
            console.log('User addition error:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} className="login-form">
            <Typography variant="h3" component="div">Rekisteröidy</Typography>
            <TextField
                label="Nimi"
                variant="outlined"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
            />
            <TextField
                label="Käyttäjätunnus"
                variant="outlined"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
            />
            <TextField
                label="Salasana"
                type="password"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <div className="submitBackBtns">
                <Button type="submit" variant='contained'>Rekisteröidy</Button>
                <Button type="button" variant='outlined' onClick={onBack}>Takaisin</Button>
            </div>
        </Box>
    );
};

export default AddUserForm;
