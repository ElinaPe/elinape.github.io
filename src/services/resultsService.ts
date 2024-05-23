import Axios from "axios"
import { ResultList, ApiResponse, GlobalData } from "../types"


const baseUrl = "https://localhost:7252/api/calculator"

let token: string | null = null
const setToken = (newToken: string) =>{
    token = `bearer ${newToken}`
}



const getCityNames = () => {
    const config = {
        headers: { Authorization: token }, 
    }
    const request = Axios.get<ResultList[]>(baseUrl, config)
    return request.then(response => response.data)
    }

const getCalculatorsByCityId = (cityId: number) => {
    const config = {
        headers: { Authorization: token }, 
    }
    return Axios.get<ApiResponse>(`${baseUrl}/GetDetails/${cityId}`)
        .then(response => {
            console.log("API Response:", response.data, config);
            return response.data;
        });
};

const bulkSave = (placeName: string, globalData: GlobalData) => {
    const config = {
        headers: { Authorization: token }, 
    }
    const payload = {
        placeName: placeName,
        calculators: globalData
    };
    console.log('payload', payload)
    return Axios.post(`${baseUrl}/bulk-save`, payload, config)
        .then(response => response.data)
        .catch(error => {
            console.error("Error during the bulk save:", error);
            throw error;
        });
};

const deleteResultList = (id: number) => {
    const config = {
        headers: { Authorization: token }, 
    }
    return Axios.delete(`${baseUrl}/delete/${id}`, config)
        .then(response => response.data)
        .catch(error => {
            console.error("Error during the delete operation:", error);
            throw error;
        });
};

export default { getCityNames, getCalculatorsByCityId, bulkSave, deleteResultList, setToken }
