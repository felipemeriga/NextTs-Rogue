# Class 12 - Delete and View Customer Component

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

Now we are ready to create the component to view a single user,
and also delete if we want.

So, when we click in one of the users of the table, it will bring us to the URL
```/customer/[id]``` the id will be replaced by the ID of the user, the good thing is that
NextJS already does this automatically for us, you just need to create a folder called 
[/pages/customers/[id]](/pages/customers/[id]), and an index.tsx page inside that, and fill with the
following code:
```typescript jsx
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { useCustomer, useMutationDeleteCustomer } from '../../../hooks/hooks'
import { ICustomer } from '../../../interfaces'
import Loading from '../../../components/Loading'

function Customer(): JSX.Element {
    const router = useRouter()
    const { id } = router.query

    const mutation = useMutationDeleteCustomer()

    const onClick = (): void => {
        mutation.mutate(String(id))
    }

    if (mutation.isSuccess) {
        router.push('/')
    }

    const { data, error } = useCustomer(String(id))
    const customer: ICustomer = data as ICustomer

    if (error || mutation.error) return <div>failed to load</div>

    return (
        <Layout>
            <h1>Customer</h1>
            <hr />
            {customer ? (
                <div>
                    <p className="name">
                        {customer.firstName} {customer.lastName}
                    </p>
                    <p className="num">{customer.telephone}</p>
                    <p className="num">{customer.creditCard}</p>

                    <div className="buttons">
                        <Link href={'/customers/[id]/update'} as={`/customers/${id}/update`}>
                            <a className="editButton">Edit</a>
                        </Link>
                        <button className="deleteButton" onClick={onClick}>
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </Layout>
    )
}

export default Customer

```

You might note that now we are using two hooks, the ```useCustomer``` for getting a single user,
and ```useMutationDeleteCustomer``` for deleting this customer.

Let's give some style to that page, in [styles.css](styles.css), add the following content bellow
the one that already exists there.

```css
.name {
    font-size: 1.25rem;
    font-weight: 600;
}
.buttons {
    text-align: right;
}
.editButton {
    display: inline-block;
    border: 1px solid #0070f3;
    border-radius: 3px;
    padding: 0.25rem 1rem;
    margin-right: 0.25rem;
}
.editButton:hover {
    text-decoration: none;
}
.deleteButton {
    background-color: inherit;
    border: 1px solid #d32f2f;
    border-radius: 3px;
    padding: 0.25rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    color: #d32f2f;
}

```