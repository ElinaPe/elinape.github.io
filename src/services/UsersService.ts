import Axios from "axios"

const baseUrl = "https://localhost:7252/api/users"

const createNewUser = (newName: string, newUsername: string, newPassword: string) => {
    const payload = {
        name: newName,
        username: newUsername,
        password: newPassword
    };
    return Axios.post(baseUrl, payload)
        .then(response => response.data)
        .catch(error => {
            console.error("Error during saving:", error);
            throw error;
        });
}

export default { createNewUser }