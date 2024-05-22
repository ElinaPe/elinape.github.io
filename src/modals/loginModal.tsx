import React from 'react';
import { Box, Modal, Typography } from '@mui/material';
import LoginForm from '../components/LoginForm';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  setLoggedUser: (value: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, setLoggedUser }) => (
  <Modal open={open} onClose={onClose}>
    <Box className="login-modal">
      <LoginForm setLoggedUser={setLoggedUser} onSubmit={(data) => {
        // Lähetä kirjautumisdata backendille
        console.log('modalista data' , data);
        onClose();
      }} />
    </Box>
  </Modal>
);

export default LoginModal;