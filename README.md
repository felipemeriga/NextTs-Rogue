# Class 4 - Creating the _app.tsx

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

This class we are going to be creating the _app.tsx component,
which is a component that overrides some next default configurations,
because as Next works as static webpages, each of the pages of the application
are treated like separated pages.

So next uses App component to initialize pages, so every page that is 
initialized it will use that configuration, and we can override that configuration,
creating a file named [_app.tsx](pages/_app.tsx), in the [pages](pages) folder,
that will override the main configuration.

Why do we need this? Because, if you want to inject some generic CSS over all the pages,
or configure a middleware for all the pages, you would need to override the configurations.

So, create a file inside [pages](pages) folder named _app.tsx, and paste the content:

```typescript jsx
// pages/_app.js
import App from 'next/app'
import React from 'react'

class MyApp extends App {
    render(): JSX.Element {
        const { Component, pageProps } = this.props
        return <Component {...pageProps} />
    }
}

export default MyApp

```

And finally paste the following code on [index.tsx](pages/index.tsx):

```typescript jsx
import Link from 'next/link'
import Layout from '../components/Layout'
import * as React from 'react'

function App(): JSX.Element {
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
        </Layout>
    )
}

export default App

```