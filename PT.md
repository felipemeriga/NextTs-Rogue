# Aula 10 - Hook Para Criar Customers


Na última aula, vimos a magia do React Query, e hoje vamos usá-lo
em nosso componente de formulário, para criar um novo usuário usando ganchos e a função HTTP POST que criamos.

Portanto, adicione o seguinte código ao arquivo [pages/customers/create.tsx](pages/customers/create.tsx):
```typescript jsx
import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { ICustomer } from '../../interfaces'
import { useForm } from 'react-hook-form'
import { useMutationCreateCustomer } from '../../hooks/hooks'
import { useRouter } from 'next/router'
import Loading from '../../components/Loading'

function Create(): JSX.Element {
    const [errorMessage, setErrorMessage] = useState<string>('')
    const router = useRouter()

    const { handleSubmit, register, errors } = useForm<ICustomer>()

    const { error, isError, isLoading, isSuccess, mutate, reset } = useMutationCreateCustomer()

    const onSubmit = handleSubmit(async (formData: ICustomer) => {
        if (errorMessage) setErrorMessage('')
        mutate(formData)
    })

    const timeoutError = () => {
        setTimeout(() => setErrorMessage(''), 4000)
    }

    if (isSuccess) {
        router.push('/')
    }

    if (isError) {
        reset()
        setErrorMessage((error as any).message)
        timeoutError()
    }

    return (
        <Layout>
            <h1>Create Customer</h1>

            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    <form onSubmit={onSubmit}>
                        <div>
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="e.g. John"
                                ref={register({ required: 'First Name is required' })}
                            />
                            {errors.firstName && (
                                <span role="alert" className="error">
                                    {errors.firstName.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="e.g. Doe"
                                ref={register({ required: 'Last Name is required' })}
                            />
                            {errors.lastName && (
                                <span role="alert" className="error">
                                    {errors.lastName.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <label>Telephone</label>
                            <input
                                type="text"
                                name="telephone"
                                placeholder="e.g. 123-456-7890"
                                ref={register}
                            />
                            {errors.telephone && (
                                <span role="alert" className="error">
                                    {errors.telephone.message}
                                </span>
                            )}
                        </div>

                        <div>
                            <label>Credit Card Number</label>
                            <input
                                type="text"
                                name="creditCard"
                                placeholder="e.g. 1234567890123456"
                                ref={register}
                            />
                            {errors.creditCard && (
                                <span role="alert" className="error">
                                    {errors.creditCard.message}
                                </span>
                            )}
                        </div>

                        <div className="submit">
                            <button type="submit" className="submitButton">
                                Create
                            </button>
                        </div>
                    </form>
                    {errorMessage && (
                        <p role="alert" className="errorMessage">
                            {errorMessage}
                        </p>
                    )}
                </div>
            )}
        </Layout>
    )
}

export default Create

```

Mutation é quando basicamente estamos mutando / alterando dados, e o React Query nos oferece
outros atributos, como `` `error, isError, isLoading, isSuccess, mutate, reset```, que irão
ser conectado com nosso estado, e podemos usar para gerenciar nosso componente, para mostrar as etapas de carregamento, erros e
os resultados em si.