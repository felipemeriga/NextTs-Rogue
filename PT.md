# Aula 14 - Criar Hook para Atualizar

Agora que já temos o componente de atualização do cliente, o único
o que resta são os hooks e a função HTTP fetch, primeiro vamos criar uma PUT
HTTP request, em [services/fetch.ts](services/fetch.ts), adicione este método a seguir em
o arquivo que já existe em seu projeto:

```typescript jsx
export async function updateCustomer(customer: ICustomer): Promise<ICustomer> {
    return await getAxiosInstance().put(`/customers/${customer._id}/update`, customer)
}

```

Então, no arquivo [hooks/hooks.ts](hooks/hooks.ts), adicione a seguinte função ao
código existente:
```typescript jsx
export function useMutationUpdateCustomer(): UseMutationResult<
    ICustomer,
    unknown,
    ICustomer,
    unknown
> {
    return useMutation('customer', (data: ICustomer) => updateCustomer(data))
}

```


Além disso, vamos criar o hook para interceptar a solicitação PUT HTTP, portanto, no
arquivo [services/mock.ts](services/mock.ts), adicione esta parte ao código existente:
```typescript jsx
mock.onPut(url).reply(function (config) {
    if (config.url) {
        const id = String(config.url.match(/\d/g))

        const index: number | undefined = sampleCustomerData.findIndex(
            (value: ICustomer) => value._id === id
        )
        const data: ICustomer = JSON.parse(config.data)
        data._id = id
        sampleCustomerData[index] = data
        return [200, data]
    } else {
        return [500, 'response']
    }
})

```

Agora, que temos o hook e o método HTTP, a página de atualização inteira [/pages/customers/[id]/update.tsx](/pages/customers/[id]/update.tsx),
será como:
```typescript jsx
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import { useCustomer, useMutationUpdateCustomer } from '../../../hooks/hooks'
import { ICustomer } from '../../../interfaces'
import React, { useState } from 'react'
import Loading from '../../../components/Loading'
import Form from '../../../components/Form'

function Update(): JSX.Element {
    const [errorMessage, setErrorMessage] = useState('')
    const mutation = useMutationUpdateCustomer()

    const router = useRouter()
    const { id } = router.query

    const { data, error } = useCustomer(String(id))
    const customer: ICustomer = data as ICustomer

    if (error) return <div>failed to load</div>

    const onSubmitCallback = (formData: ICustomer) => {
        if (errorMessage) setErrorMessage('')
        formData._id = String(id)
        mutation.mutate(formData)
    }

    if (mutation.error) {
        setErrorMessage('Error updating the user')
    }

    if (mutation.isSuccess) {
        router.push('/')
    }

    return (
        <Layout>
            {customer ? (
                <div>
                    <h1>Edit Customer</h1>
                    <Form submitFormCallback={onSubmitCallback} defaultValues={customer} />
                    {errorMessage && (
                        <p role="alert" className="errorMessage">
                            {errorMessage}
                        </p>
                    )}
                </div>
            ) : (
                <Loading />
            )}
        </Layout>
    )
}

export default Update

```