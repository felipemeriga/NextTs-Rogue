import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {ICustomer} from "../interfaces";
import {MOCK_ON} from "../utils/constants";
import {initMock} from "./mock";

let axiosInstance: AxiosInstance

function createAxiosInstanceFactory(axiosRequestConfig: AxiosRequestConfig):AxiosInstance {
    return axios.create(axiosRequestConfig)
}

export function getAxiosInstance():AxiosInstance {
    if(!axiosInstance) {
        axiosInstance = createAxiosInstanceFactory( {
            baseURL: '',
            timeout: 10000,
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json'
            }
        })
        if(MOCK_ON){
            initMock(axiosInstance)
        }
    }
    return axiosInstance
}

export async function getCustomers():Promise<ICustomer[]> {
    return await getAxiosInstance().get('/customers')
}