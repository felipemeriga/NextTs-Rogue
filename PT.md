# Aula 13 - Componente para Atualizar Customer


Hoje vamos criar um dos últimos componentes do nosso aplicativo,
mas como o formulário para editar um cliente é o mesmo formulário para criar, iremos refatorar este
formulário para um único componente, usando os recursos de composição do React, podemos
tem um único componente para a página de criação e atualização.

Primeiro, crie um arquivo chamado [Form.tsx](components/Form.tsx), na pasta
[componentes](componentes).

```typescript jsx
import { useForm } from 'react-hook-form'
import { ICustomer } from '../interfaces'
import React from 'react'

interface IProps {
    submitFormCallback: (submitForm: ICustomer) => void
    defaultValues: ICustomer | null
}

function Form(props: IProps): JSX.Element {
    const { submitFormCallback, defaultValues } = props

    const { handleSubmit, register, errors } = useForm({
        defaultValues: {
            ...defaultValues,
        },
    })

    const onSubmitForm = handleSubmit(async (formData: ICustomer) => {
        submitFormCallback(formData)
    })

    return (
        <form onSubmit={onSubmitForm}>
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
                    {defaultValues == null ? 'Create' : 'Edit'}
                </button>
            </div>
        </form>
    )
}

export default Form

```

Este componente Form será usado na página de criação e atualização, então agora,
vá para [pages/customers/create.tsx](pages/customers/create.tsx) e refatore-o
adicionando o novo componente de formulário.

```typescript jsx
import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { ICustomer } from '../../interfaces'
import { useMutationCreateCustomer } from '../../hooks/hooks'
import { useRouter } from 'next/router'
import Loading from '../../components/Loading'
import Form from '../../components/Form'

function Create(): JSX.Element {
    const [errorMessage, setErrorMessage] = useState<string>('')
    const router = useRouter()

    const { error, isError, isLoading, isSuccess, mutate, reset } = useMutationCreateCustomer()

    const onSubmitCallback = (formData: ICustomer) => {
        if (errorMessage) setErrorMessage('')
        mutate(formData)
    }

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
                    <Form defaultValues={null} submitFormCallback={onSubmitCallback} />
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

Finalmente, vamos criar o componente de atualização, criá-lo como [pages/customers/[id]/update.tsx](pages/customers/[id]/update.tsx)

```typescript jsx
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import { useCustomer } from '../../../hooks/hooks'
import { ICustomer } from '../../../interfaces'
import React, { useState } from 'react'
import Loading from '../../../components/Loading'
import Form from '../../../components/Form'

function Update(): JSX.Element {
    const [errorMessage, setErrorMessage] = useState('')

    const router = useRouter()
    const { id } = router.query

    const { data, error } = useCustomer(String(id))
    const customer: ICustomer = data as ICustomer

    if (error) return <div>failed to load</div>

    const onSubmitCallback = (formData: ICustomer) => {
        if (errorMessage) setErrorMessage('')
        formData._id = String(id)
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