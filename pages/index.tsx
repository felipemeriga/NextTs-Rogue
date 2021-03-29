import Link from 'next/link'
import Layout from '../components/Layout'
import * as React from "react"
import ReactLoading from 'react-loading'
import DataRow from "../components/DataRow"
import {ICustomer} from "../interfaces"
import {sampleCustomerData} from "../utils/sample-data"

class App extends React.Component {

    constructor(props: never) {
        super(props)
    }

    render() {
        const mockData: ICustomer[] = sampleCustomerData

        return (
            <Layout>
                <h1>Next Fauna CRUD</h1>

                <Link href={"/customers/create"}>
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
                {
                    mockData ? (
                        mockData.map((costumer) => (
                            <DataRow data={costumer} key={costumer.id}/>
                        ))
                    ) : (
                        <div className="loading">
                            <ReactLoading type={"spin"} color={"#0073ff"}/>
                        </div>
                    )
                }
            </Layout>
        )
    }
}

export default App