import Axios from "axios"
import { ResultList, ApiResponse, GlobalData } from "../types"

const baseUrl = "https://localhost:7252/api/calculator";
// const baseUrl = "https://aisoftcalculator.azurewebsites.net/api/calculator"

let token: string | null = null
const setToken = (newToken: string) =>{
    token = `bearer ${newToken}`
}

const getConfig = () => ({
    headers: {
      Authorization: token,
    },
  });


const getCityNames = () => {
    const request = Axios.get<ResultList[]>(baseUrl, getConfig())
    return request.then(response => response.data)
    }

const getCityNamesById = (loginId: number) => {
    const request = Axios.get<ResultList[]>(`${baseUrl}/by-user/${loginId}`, getConfig())
    return request.then(response => response.data)
    }

const getCalculatorsByCityId = (cityId: number) => {
    return Axios.get<ApiResponse>(`${baseUrl}/GetDetails/${cityId}`)
        .then(response => {
            console.log("API Response:", response.data, getConfig());
            return response.data;
        });
};

const bulkSave = (placeName: string, globalData: GlobalData, loginId: number) => {
    const payload = {
        placeName: placeName,
        calculators: globalData,
        loginId: loginId
    };
    console.log('payload', payload)
    return Axios.post(`${baseUrl}/bulk-save`, payload, getConfig())
        .then(response => response.data)
        .catch(error => {
            console.error("Error during the bulk save:", error);
            throw error;
        });
};

const deleteResultList = (id: number) => {
    return Axios.delete(`${baseUrl}/delete/${id}`, getConfig())
        .then(response => response.data)
        .catch(error => {
            console.error("Error during the delete operation:", error);
            throw error;
        });
};

export default { getCityNames, getCityNamesById, getCalculatorsByCityId, bulkSave, deleteResultList, setToken }
