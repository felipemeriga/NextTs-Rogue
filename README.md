# Class 7 - Loading and Create Component

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

In this class we are going to make a Loading component, and also
the create form component, which is the form where we are going to create 
more customers.


First let's Create our Loading component, named [Loading.tsx](components/Loading.tsx), in
the [components](components) folder:

```typescript jsx
import ReactLoading from 'react-loading'
import * as React from 'react'

function Loading(): JSX.Element {
    return (
        <div className="loading">
            <ReactLoading type={'spin'} color={'#0073ff'} />
        </div>
    )
}

export default Loading

```

Now we are ready to insert this component in [index.tsx](pages/index.tsx), modify this code
with this one:
```typescript jsx
import Link from 'next/link'
import Layout from '../components/Layout'
import * as React from 'react'
import { sampleCustomerData } from '../utils/sample-data'
import { ICustomer } from '../interfaces'
import DataRow from '../components/DataRow'
import Loading from '../components/Loading'

function App(): JSX.Element {
    const data = sampleCustomerData
    const rowData: ICustomer[] = data as ICustomer[]

    return (
        <Layout>
            <h1>Next CRUD App</h1>

            <Link href={'/customers/create'}>
                <a className="createNew">Create New Customer</a>
            </Link>
            <div className="table">
                <h2>Customer Data</h2>
                <div className="headerRow">
                    <h4>name</h4>
                    <h4>telephone</h4>
                    <h4 className="creditCard">credit card</h4>
                </div>
            </div>
            {data ? (
                rowData.map((costumer: ICustomer) => <DataRow data={costumer} key={costumer._id} />)
            ) : (
                <Loading />
            )}
        </Layout>
    )
}

export default App

```

Now we are going to create the [form component](pages/customers/create.tsx), so create a file under the 
folder [/pages/customers/create.tsx](/pages/customers/create.tsx):

```typescript jsx
import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { ICustomer } from '../../interfaces'
import { useForm } from 'react-hook-form'

function Create(): JSX.Element {
    const [errorMessage, setErrorMessage] = useState<string>('')

    const { handleSubmit, register, errors } = useForm<ICustomer>()

    const onSubmit = handleSubmit(async (formData: ICustomer) => {
        if (errorMessage) setErrorMessage('')
        console.log(formData)
    })

    return (
        <Layout>
            <h1>Create Customer</h1>
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
        </Layout>
    )
}

export default Create

```

Add the following CSS to [styles.css](styles.css), in order to give some style to our 
form.


```css

.loading {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}

form {
    background-color: #eee;
    border-radius: 4px;
    padding: 2rem;
}
label {
    font-size: 0.9rem;
    font-weight: 600;
}
input {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.75rem;
    margin: 0.25rem 0 1rem;
}
.submit {
    margin-top: 1rem;
    text-align: right;
}
.submitButton {
    background-color: #0070f3;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 1rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
}
.error,
.errorMessage {
    color: #d32f2f;
}
.error {
    display: block;
    margin-bottom: 1rem;
}

```
