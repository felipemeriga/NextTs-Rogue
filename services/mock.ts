import MockAdapter from 'axios-mock-adapter'
import { sampleCustomerData } from '../utils/sample-data'
import { AxiosInstance } from 'axios'
import { ICustomer } from '../interfaces'

export function initMock(axiosIntance: AxiosInstance): void {
    const mock: MockAdapter = new MockAdapter(axiosIntance, { delayResponse: 2000 })
    mock.onGet('/customers').reply(200, sampleCustomerData)
    mock.onPost('/customers').reply(function (config) {
        const data: ICustomer = JSON.parse(config.data)
        data.id = String(Math.floor(Math.random() * 100 + 6))
        sampleCustomerData.push(data)
        return [200, 'response']
    })

    const url = new RegExp(`customers/*`)
    mock.onGet(url).reply(function (config) {
        if (config.url) {
            const id = config.url.substring(config.url.lastIndexOf('/') + 1)

            const customer: ICustomer | undefined = sampleCustomerData.find(
                (value: ICustomer) => value.id === id
            )
            return [200, customer]
        } else {
            return [500, 'response']
        }
    })

    mock.onDelete(url).reply(function (config) {
        if (config.url) {
            const id = config.url.substring(config.url.lastIndexOf('/') + 1)
            const index: number = sampleCustomerData.findIndex(
                (value: ICustomer) => value.id === id
            )
            sampleCustomerData.splice(index, 1)
            return [200, 'response']
        } else {
            return [500, 'response']
        }
    })

    mock.onPut(url).reply(function (config) {
        const data: ICustomer = JSON.parse(config.data)

        const index: number = sampleCustomerData.findIndex(
            (value: ICustomer) => value.id === data.id
        )
        sampleCustomerData[index] = data
        return [200, data]
    })
}
