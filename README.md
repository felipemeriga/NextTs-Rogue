# Class 8 - HTTP Fetch and Mocks

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

In this class we are going to work on Axios and mockups,
Axios is the NPM package to help us doing HTTP requests, and mockups
it's basically intercepting those HTTP requests, and responding them with dummy data,
this is a common practice of frontend developers, because the HTTP requests 
are created to request data from a backend/microservice.

Usually the team that creates the API layer it's not in synchronization with the 
frontend team, so instead of waiting the API endpoints to be ready by the backend developers,
we can create mocks, that will intercept and return fake responses to our app, just to 
simulate until the API it's not done yet.

First, create a file named [constants](utils/constants.ts), on [utils](utils) directory:
```typescript jsx
export const MOCK_ON = process.env.REACT_MOCK_ON === 'true'

```

We will use this to turn on/off our mocks.

Now, let's create the mocks, create a file named [mock.ts](services/mock.ts), under
[services](services) folder.

```typescript jsx
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

```

Finaly we are ready to create our API requests with Axios,
create a file named [fetch.ts](services/fetch.ts), under the [services](services)
folder.

```typescript jsx
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
            baseURL: '/api',
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
    return await getAxiosInstance().post('/customers/create', customer)
}

```
