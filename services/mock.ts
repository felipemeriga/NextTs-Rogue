import MockAdapter from 'axios-mock-adapter'
import { sampleCustomerData } from '../utils/sample-data'
import { AxiosInstance } from 'axios'
import { ICustomer } from '../interfaces'

export function initMock(axiosIntance: AxiosInstance): void {
    const mock: MockAdapter = new MockAdapter(axiosIntance, { delayResponse: 2000 })
    mock.onGet('/customers').reply(200, sampleCustomerData)
    mock.onPost('/customers/create').reply(function (config) {
        const data: ICustomer = JSON.parse(config.data)
        data._id = String(Math.floor(Math.random() * 100 + 6))
        sampleCustomerData.push(data)
        return [200, 'response']
    })
}
