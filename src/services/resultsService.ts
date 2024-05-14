import Axios from "axios"
import { Calculator, ResultList } from "../types"
interface CalculatorsList {
    section: string
    title: string;
    result: {
        name: string;
        value: number | null;  
        unit?: string | null;  
    }
}
interface ApiResponse {
    resultsListId: number;
    loginId: number;
    placeName: string;
    savingDate: string;
    calculators: CalculatorsList[];
}
interface GlobalData {
    [key: string]: Calculator[];
  }

const baseUrl = "https://localhost:7252/api/calculator"

const getCityNames = () => {
    const request = Axios.get<ResultList[]>(baseUrl)
    return request.then(response => response.data)
    }

const getCalculatorsByCityId = (cityId: number) => {
    return Axios.get<ApiResponse>(`${baseUrl}/GetDetails/${cityId}`)
        .then(response => {
            console.log("API Response:", response.data);
            return response.data;
        });
};

const bulkSave = (placeName: string, globalData: GlobalData) => {
    console.log('payloadin yläpuolella',JSON.stringify({ place_name: placeName, globalData }));
    const payload = {
        placeName: placeName,
        calculators: globalData
    };
    console.log('payload', payload)
    return Axios.post(`${baseUrl}/bulk-save`, payload)
        .then(response => response.data)
        .catch(error => {
            console.error("Error during the bulk save:", error);
            throw error;
        });
};
const deleteResultList = (id: number) => {
    return Axios.delete(`${baseUrl}/delete/${id}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error during the delete operation:", error);
            throw error;
        });
};

export default { getCityNames, getCalculatorsByCityId, bulkSave, deleteResultList }
