import { IGateway } from "../interfaces/gateway";
import axios, {isCancel, AxiosError} from 'axios';
import { API_URL } from "../config/config";

export const createGateway = async (gateway: IGateway): Promise<IGateway> => {
    const response = await axios.post(`${API_URL}/api/v1/gateway`, gateway)
    return response.data
}

export const editGateway = async (gateway: IGateway, id: string): Promise<IGateway> => {
    const response = await axios.put(`${API_URL}/api/v1/gateway/${id}`, gateway)
    return response.data
}

export const fetchAllGateways = async (): Promise<IGateway[]> => {
    const response = await axios.get(`${API_URL}/api/v1/gateway`)
    return response.data
}

export const deleteGateway = async (id:string): Promise<IGateway[]> => {
    const response = await axios.delete(`${API_URL}/api/v1/gateway/${id}`)
    return response.data
}