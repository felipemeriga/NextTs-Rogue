# Aula 11 - Criar Hook para Buscar/Deletar um Customer


Agora vamos criar a função fetch HTTP, hooks e mockups para obter
um único usuário ou excluir este usuário, então, vamos para o
arquivo [services/fetch.ts](services/fetch.ts) e adicione essas duas outras funções:
```typescript jsx
export async function getCustomer(id: string): Promise<ICustomer> {
    const { data } = await getAxiosInstance().get(`/customers/${id}`)
    return data
}

export async function deleteCustomer(id: string): Promise<AxiosResponse> {
    return await getAxiosInstance().delete(`/customers/${id}`)
}

```

Agora é hora de adicionar os hooks a essas duas funções de busca HTTP, vá para
[hooks/hooks.ts](hooks/hooks.ts) e adicione estas duas funções a seguir:
```typescript jsx
export function useCustomer(id: string): UseQueryResult {
    return useQuery(['customer', id], () => getCustomer(id), {
        enabled: !!id,
    })
}

export function useMutationDeleteCustomer(): UseMutationResult<
    AxiosResponse<any>,
    unknown,
    string,
    unknown
> {
    return useMutation('customer', (id: string) => deleteCustomer(id))
}

```

Finalmente, como ainda não temos uma camada de API, vamos criar a função de interceptação de mockup
para isso, em [services/mock.ts](services/mock.ts), dentro da função ```initMock```, adicione essas duas
funções:

```typescript jsx
    const url = new RegExp(`customers/*`)
    mock.onGet(url).reply(function (config) {
        if (config.url) {
            const id = config.url.substring(config.url.lastIndexOf('/') + 1)

            const customer: ICustomer | undefined = sampleCustomerData.find(
                (value: ICustomer) => value._id === id
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
                (value: ICustomer) => value._id === id
            )
            sampleCustomerData.splice(index, 1)
            return [200, 'response']
        } else {
            return [500, 'response']
        }
    })

```

Agora podemos criar um componente para ele!