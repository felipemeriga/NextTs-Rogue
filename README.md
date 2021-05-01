# Class 11 - Single Customer Get and Delete Hook

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

Now we will create the fetch HTTP function, hooks and mockups for getting
a single user or deleting this single user, so, let's go to the 
file [services/fetch.ts](services/fetch.ts), and add those two more functions:

```typescript jsx
export async function getCustomer(id: string): Promise<ICustomer> {
    const { data } = await getAxiosInstance().get(`/customers/${id}`)
    return data
}

export async function deleteCustomer(id: string): Promise<AxiosResponse> {
    return await getAxiosInstance().delete(`/customers/${id}`)
}

```

Now it's time to add the hooks to those two HTTP fetch functions, go to 
[hooks/hooks.ts](hooks/hooks.ts), and add these two following functions:
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

Finally, as we don't have an API layer yet, let's create the mockup intercept function
for it, in [services/mock.ts](services/mock.ts), inside the ```initMock``` function, add those two
functions:

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

Now we can create a component for it!