import Link from 'next/link'
import Layout from '../components/Layout'
import * as React from 'react'
import { sampleCustomerData } from '../utils/sample-data'
import { ICustomer } from '../interfaces'
import DataRow from '../components/DataRow'

function App(): JSX.Element {
    const rowData: ICustomer[] = sampleCustomerData as ICustomer[]

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
            {rowData.map((costumer: ICustomer) => (
                <DataRow data={costumer} key={costumer._id} />
            ))}
        </Layout>
    )
}

export default App
