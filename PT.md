# Aula 8 - Criando a camada HTTP e Mockups

Nesta aula, vamos trabalhar em Axios e mockups,
Axios é o pacote NPM para nos ajudar a fazer solicitações HTTP, e mockups
é basicamente interceptar essas solicitações HTTP e respondê-las com dados fictícios,
esta é uma prática comum de desenvolvedores frontend, porque as solicitações de HTTP
são criados para solicitar dados de um backend / microsserviço.

Normalmente, a equipe que cria a camada API não está em sincronização com o
equipe de frontend, então, em vez de esperar que os endpoints da API estejam prontos pelos desenvolvedores de backend,
podemos criar simulações, que irão interceptar e retornar respostas falsas para nosso aplicativo, apenas para
simule até que a API ainda não esteja pronta.

Primeiro, crie um arquivo chamado [constants](utils/constants.ts), no diretório [utils](utils):
```typescript jsx
export const MOCK_ON = process.env.REACT_MOCK_ON === 'true'

```

Usaremos isso para ligar / desligar nossos mocks.

Agora, vamos criar os mocks, criar um arquivo chamado [mock.ts](services/mock.ts), em
pasta [services](services).

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

Finalmente, estamos prontos para criar nossas solicitações de API com Axios,
crie um arquivo chamado [fetch.ts](services/fetch.ts), em [services](services)
pasta.

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
