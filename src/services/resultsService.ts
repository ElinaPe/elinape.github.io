import Axios from "axios"
import { ResultList } from "../types"

const baseUrl = "https://localhost:7252/api/calculator"

const getCityNames = () => {
    const request = Axios.get<ResultList[]>(baseUrl)
    return request.then(response => response.data)
    }

const getCalculatorsByCityId = (cityId: number) => {
    return Axios.get<{ resultListId: number; placeName: string; calculators: { title: string; result: { name: string; unit: string | null; value: number | null } | null }[] }>(`${baseUrl}/GetDetails/${cityId}`)
        .then(response => response.data);
};

export default { getCityNames, getCalculatorsByCityId }
	