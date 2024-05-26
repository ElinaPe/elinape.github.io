import React, { useContext, useState } from 'react';
import { Box, IconButton, Modal } from '@mui/material';
import LoginForm from '../components/LoginForm';
import RegisterModal from './RegisterModal'
import CloseIcon from '@mui/icons-material/Close';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  setLoggedUser: React.Dispatch<React.SetStateAction<string>>;
  setSelectedTab: (value: number) => void;
  setLoginId: React.Dispatch<React.SetStateAction<number>>;
}
  const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, setLoggedUser, setSelectedTab, setLoginId }) => {
    const [registrationOpen, setRegistrationOpen] = useState(false);
  
    const handleRegister = () => {
      setRegistrationOpen(true);
    };

    const handleClose = () => {
        // console.log('Modal closing...');
        onClose()
    }
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box className="login-modal">
        <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: 'white' }}>
          <CloseIcon />
        </IconButton>
          <LoginForm setLoggedUser={setLoggedUser} onClose={onClose} setSelectedTab={setSelectedTab} setLoginId={setLoginId} />
          <button className='registerBtn' onClick={handleRegister}>Rekisteröidy</button>
          <RegisterModal open={registrationOpen} onClose={() => setRegistrationOpen(false)} />
        </Box>
      </Modal>
    );
  };

export default LoginModal;
