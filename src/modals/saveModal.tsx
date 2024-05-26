import { useState } from "react";
import { Modal, TextField, Button, Box } from "@mui/material";
import { GlobalData } from "../types";
import api from "../services/resultsService"

interface saveButtonprops {
    globalData: GlobalData,
    loginId: number
}

const SaveButton: React.FC<saveButtonprops> = ({ globalData, loginId }) => {
    const [open, setOpen] = useState(false);
    const [placeName, setPlaceName] = useState("");

    const handleSave = async () => {
        if (placeName.trim() === "") {
            alert("Paikkakunnan nimi ei voi olla tyhjä.");
            return;
        }
        setOpen(false);
        try {
            api.bulkSave(placeName, globalData, loginId)
            .then(data => {
                console.log("Save successful:", data);
                alert("Tiedot tallennettu onnistuneesti!");
            })
            .catch(error => {
                console.error("Save failed:", error);
                alert("Tallennus epäonnistui, yritä uudelleen.");
            });
            
        } catch (error: any) {
            if (error.response) {
                // Palvelimen antamat virheet
                console.error("API error response:", error.response.data);
                alert("Tallennus epäonnistui: " + (error.response.data.detail || "Tuntematon virhe"));
            } else if (error.request) {
                // Pyynnön lähettäminen epäonnistui
                console.error("API request failed:", error.request);
                alert("Verkkovirhe, tarkista yhteys.");
            } else {
                // Virhe pyynnön luomisessa
                console.error("Error setting up request:", error.message);
                alert("Ohjelmointivirhe, tarkista konsoli.");
            }
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
                <h2>Tallenna Laskuri</h2>
                <TextField
                    fullWidth
                    label="Paikkakunta"
                    value={placeName}
                    onChange={(e) => setPlaceName(e.target.value)}
                    variant="outlined"
                />
                <Button onClick={handleSave} sx={{ mt: 2, display: 'block', width: '100%' }}>Tallenna</Button>
            </Box>
            </Modal>
        </div>
    );
};

export default SaveButton