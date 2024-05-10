import Axios from "axios"
import { Calculator, ResultList } from "../types"
interface CalculatorsList {
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

const bulkSave = (placeName: string, calculators: Calculator[]) => {
    const payload = {
        placeName: placeName,
        calculators: calculators
    };
    console.log('payload', payload)
    return Axios.post(`${baseUrl}/bulk-save`, payload)
        .then(response => response.data)
        .catch(error => {
            console.error("Error during the bulk save:", error);
            throw error;
        });
};

export default { getCityNames, getCalculatorsByCityId, bulkSave }
