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
