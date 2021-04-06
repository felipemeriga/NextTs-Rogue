import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import { useCustomer } from '../../../hooks/hooks'
import { ICustomer } from '../../../interfaces'
import React from 'react'
import EditForm from '../../../components/EditForm'
import Loading from '../../../components/Loading'

function Update(): JSX.Element {
    const router = useRouter()
    const { id } = router.query

    const { data, error } = useCustomer(String(id))
    const customer: ICustomer = data as ICustomer

    if (error) return <div>failed to load</div>

    const onSuccess = (): void => {
        router.push('/')
    }

    return (
        <Layout>
            {customer ? (
                <EditForm onSuccess={onSuccess} defaultValues={customer} id={id.toString()} />
            ) : (
                <Loading />
            )}
        </Layout>
    )
}

export default Update
