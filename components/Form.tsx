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
