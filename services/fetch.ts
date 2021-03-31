import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ICustomer } from '../interfaces'
import { MOCK_ON } from '../utils/constants'
import { initMock } from './mock'

let axiosInstance: AxiosInstance

function createAxiosInstanceFactory(axiosRequestConfig: AxiosRequestConfig): AxiosInstance {
    return axios.create(axiosRequestConfig)
}

export function getAxiosInstance(): AxiosInstance {
    if (!axiosInstance) {
        axiosInstance = createAxiosInstanceFactory({
            baseURL: '',
            timeout: 10000,
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json',
            },
        })
        if (MOCK_ON) {
            initMock(axiosInstance)
        }
    }
    return axiosInstance
}

export async function getCustomers(): Promise<ICustomer[]> {
    const { data } = await getAxiosInstance().get('/customers')
    return data
}

export async function createCustomer(customer: ICustomer): Promise<AxiosResponse> {
    return await getAxiosInstance().post('/customers', customer)
}

export async function getCustomer(id: string): Promise<ICustomer> {
    const { data } = await getAxiosInstance().get(`/customers/${id}`)
    return data
}

export async function deleteCustomer(id: string): Promise<AxiosResponse> {
    return await getAxiosInstance().delete(`/customers/${id}`)
}

export async function updateCustomer(customer: ICustomer): Promise<ICustomer> {
    return await getAxiosInstance().put(`/customers/${customer.id}`, customer)
}
