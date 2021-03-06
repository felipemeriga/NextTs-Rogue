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
