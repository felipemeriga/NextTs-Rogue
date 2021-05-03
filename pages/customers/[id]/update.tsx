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
