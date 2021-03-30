import MockAdapter from 'axios-mock-adapter'
import { sampleCustomerData } from '../utils/sample-data'
import { AxiosInstance } from 'axios'
import { ICustomer } from '../interfaces'

export function initMock(axiosIntance: AxiosInstance) {
    const mock: MockAdapter = new MockAdapter(axiosIntance)
    mock.onGet('/customers').reply(200, sampleCustomerData)
    mock.onPost('/customers').reply(function (config) {
        const data: ICustomer = JSON.parse(config.data)
        data.id = String(Math.floor(Math.random() * 100 + 6))
        sampleCustomerData.push(data)
        return [200, 'response']
    })
}
