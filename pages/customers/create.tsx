import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { ICustomer } from '../../interfaces'
import { useForm } from 'react-hook-form'
import { useMutationCreateCustomer } from '../../hooks/hooks'
import ReactLoading from 'react-loading'
import { useRouter } from 'next/router'

const Create = () => {
    const [errorMessage, setErrorMessage] = useState<string>('')
    const router = useRouter()

    const { handleSubmit, register, errors } = useForm<ICustomer>()

    const mutation = useMutationCreateCustomer()

    const onSubmit = handleSubmit(async (formData: ICustomer) => {
        if (errorMessage) setErrorMessage('')
        mutation.mutate(formData)
    })

    if (mutation.isSuccess) {
        router.push('/')
    }

    return (
        <Layout>
            <h1>Create Customer</h1>

            {mutation.isLoading ? (
                <div className="loading">
                    <ReactLoading type={'spin'} color={'#0073ff'} />
                </div>
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
