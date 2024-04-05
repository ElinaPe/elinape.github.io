import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography'

interface CalculatorInfoModalProps {
  isOpen: boolean;
  handleClose: () => void;
  title: string;
  description: string | null | undefined;
  formula: string;
}

const CalculatorInfoModal: React.FC<CalculatorInfoModalProps> = ({
  isOpen,
  handleClose,
  title,
  description,
  formula
}) => {
  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" gutterBottom>
            {description}
        </Typography>
        <Typography variant="body1" gutterBottom>
            Laskelmien kaava on seuraava:
        </Typography>
        <Typography variant="body2" component="pre" style={{ fontFamily: 'monospace' }}>
            {formula}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Sulje</Button>
      </DialogActions>
    </Dialog>
  );
}

export default CalculatorInfoModal;