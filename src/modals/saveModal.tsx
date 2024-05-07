import { useState } from "react";
import { Modal, TextField, Button, Box } from "@mui/material";
import { Calculators } from "../types";

interface saveButtonprops {
    calculators: Calculators
}

const SaveButton: React.FC<saveButtonprops> = ({ calculators }) => {
    const [open, setOpen] = useState(false);
    const [placeName, setPlaceName] = useState("");

    const handleSave = async () => {
        setOpen(false);
        const response = await fetch("/api/calculators/bulk-save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ place_name: placeName, calculators })
        });

        if (!response.ok) {
            // Handle error
        } else {
            // Handle success
        }
    };

    return (
        <div>
            <Button onClick={() => setOpen(true)}>Tallenna</Button>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    width: 400, 
                    bgcolor: 'background.paper', 
                    boxShadow: 24, 
                    p: 4 
                }}>
                    <TextField
                        fullWidth
                        label="Paikkakunta"
                        value={placeName}
                        onChange={(e) => setPlaceName(e.target.value)}
                        variant="outlined"
                    />
                    <Button onClick={handleSave} sx={{ mt: 2 }}>Tallenna</Button>
                </Box>
            </Modal>
        </div>
    );
};

export default SaveButton