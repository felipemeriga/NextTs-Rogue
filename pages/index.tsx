import Link from 'next/link'
import Layout from '../components/Layout'
import * as React from 'react'
import DataRow from '../components/DataRow'
import { useCustomers } from '../hooks/hooks'
import { ICustomer } from '../interfaces'
import Loading from '../components/Loading'

function App() {
    const { data } = useCustomers()
    const rowData: ICustomer[] = data as ICustomer[]

    return (
        <Layout>
            <h1>Next Fauna CRUD</h1>

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
                rowData.map((costumer: ICustomer) => <DataRow data={costumer} key={costumer.id} />)
            ) : (
                <Loading />
            )}
        </Layout>
    )
}

export default App
