import Axios from "axios"
import { ResultList } from "../types"
interface CalculatorsList {
    title: string;
    resultName: string;
    resultUnit: string;
    resultValue: number;
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

export default { getCityNames, getCalculatorsByCityId }
	