import Link from 'next/link'
import Layout from '../components/Layout'
import {connect} from "react-redux";
import * as React from "react";

interface IProps {
}

interface IState {
}

interface IDispatchProps {
}

type Props = IProps & IState & IDispatchProps

class App extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <Layout>
                <h1>Next Fauna CRUD</h1>

                <Link href="/customers/create">
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

            </Layout>
        );
    }
}

export default connect(null, null)(App);
