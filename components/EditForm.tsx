import { ICustomer } from '../interfaces'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useMutationUpdateCustomer } from '../hooks/hooks'
import { router } from 'next/client'

interface IProps {
    defaultValues: ICustomer
    id: string
}

function EditForm(props: IProps): JSX.Element {
    const [errorMessage, setErrorMessage] = useState('')
    const mutation = useMutationUpdateCustomer()
    const { defaultValues, id } = props

    const { handleSubmit, register, errors } = useForm({
        defaultValues: {
            ...defaultValues,
            creditCard: defaultValues.creditCard,
        },
    })

    const onSubmit = handleSubmit(async (formData) => {
        if (errorMessage) setErrorMessage('')
        formData._id = id
        mutation.mutate(formData)
    })

    if (mutation.error) {
        setErrorMessage('Error updating the user')
    }

    if (mutation.isSuccess) {
        router.push('/')
    }

    return (
        <>
            <h1>Edit Customer</h1>

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
                        Update
                    </button>
                </div>
            </form>

            {errorMessage && (
                <p role="alert" className="errorMessage">
                    {errorMessage}
                </p>
            )}
        </>
    )
}

export default EditForm
