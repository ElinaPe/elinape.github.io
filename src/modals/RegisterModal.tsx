import React from 'react';
import { Box, Modal } from '@mui/material';
import AddUserForm from '../components/Register';

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }) => {
  
    const handleClose = () => {
        setTimeout(() => {
            onClose();
        }, 100);
    };
  
    return (
        <Modal open={open} onClose={onClose}>
            <Box className="register-modal">
                <AddUserForm onBack={handleClose}  />
            </Box>
        </Modal>
    );
};
export default RegisterModal;
