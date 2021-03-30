import MockAdapter from 'axios-mock-adapter'
import { sampleCustomerData } from '../utils/sample-data'
import { AxiosInstance } from 'axios'

export function initMock(axiosIntance: AxiosInstance) {
    const mock: MockAdapter = new MockAdapter(axiosIntance)
    mock.onGet('/customers').reply(200, sampleCustomerData)
}
