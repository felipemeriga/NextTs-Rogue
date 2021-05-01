# Class 9 - React Query

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

React Query, it's an incredible NPM package that helps us
doing assynchronous calls and create hooks directly from our components state,
so for example you can call an async HTTP function, and when the results are received,
regardless it was success or not, it will trigger your component hook, so he can 
receive the new data in its state, and use it.

As we discussed in some last classes, React and NextJS components has the state management 
capability, the state of the component is an object, that can be of any type and have many
attributes, and every time this object suffers some kind of change, the React component renders
itself, which means that the entire component refreshs again.

The capability of managing its state, it's default from React, each of the components
can manage their state idividually, although, there are also many NPM packages to manage the state of the components, we have for example,
the famous Redux, which is a global state manager, which means the state is managed in a global state between
all the component. 

But, a big problem appears when we are dealing with updating the state of components from async methods,
as they are asynchronous, we don't know when they are exactly responding us, and at the same time, we can not lock
our component until this method has a response for us.

React Query is the solution for this, it helps you to create hooks at the component level,
and call asynchronous functions, such as HTTP calls, and when those functions have a response, the
hooks will be triggered, and our state updated, like magic!

First, we need to configure, React Query in our [_app.tsx](pages/_app.tsx):

```typescript jsx
// pages/_app.js
import App from 'next/app'
import React from 'react'
import '../styles.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'

export const queryClient = new QueryClient()

class MyApp extends App {
    render(): JSX.Element {
        const { Component, pageProps } = this.props
        return (
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Component {...pageProps} />
                </Hydrate>
            </QueryClientProvider>
        )
    }
}

export default MyApp

```

Create a file under the directory [hooks](hooks), named [hooks.ts](hooks/hooks.ts):
```typescript jsx
import { useMutation, useQuery } from 'react-query'
import { createCustomer, getCustomers } from '../services/fetch'
import { ICustomer } from '../interfaces'
import { UseMutationResult, UseQueryResult } from 'react-query/types/react/types'
import { queryClient } from '../pages/_app'
import { AxiosResponse } from 'axios'

export function useCustomers(): UseQueryResult {
    return useQuery('customers', getCustomers)
}

export function useMutationCreateCustomer(): UseMutationResult<
    AxiosResponse<any>,
    unknown,
    ICustomer,
    unknown
> {
    return useMutation('customer', (data: ICustomer) => createCustomer(data), {
        onSuccess: async () => {
            await queryClient.clear()
        },
    })
}

```

Now it's time to test the HTTP points that we have created, and also the mockups, we just
need to create a hook to the HTTP fetch functions inside our component, so go to
[index.tsx](pages/index.tsx), and add the following code:

```typescript jsx
import Link from 'next/link'
import Layout from '../components/Layout'
import * as React from 'react'
import { ICustomer } from '../interfaces'
import DataRow from '../components/DataRow'
import Loading from '../components/Loading'
import { useCustomers } from '../hooks/hooks'

function App(): JSX.Element {
    const { data } = useCustomers()
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

You might have noticed that the only line that we have changed was this one:
```typescript jsx
const { data } = useCustomers()

```

Now, instead of getting data directly from the sample that we have, we are using the React Query hook ```useCustomers()```.
Off course that the mock will intercept this and retrieve the same sample data,
but now we have an entire flow of HTTP call.

Before running, remember that in the last class, in the HTTP configuration we set a boolean variable,
to trigger when we want to use ```MOCK_ON```, or not.

We will control this as an environment variable, first create a file in the root of your project named
[next.config.js](next.config.js), and add the following content:

```javascript
module.exports = {
    env: {
        REACT_MOCK_ON: process.env.REACT_MOCK_ON
    },
}

```

This file it's for NextJS reconizing the environment variables, as the pages are rendered in server side,
you need this to let NextJS know that they exist, and injest them.

Now, create a file called [.env](.env), which will be where we are going to define the environment variables:

```shell
REACT_MOCK_ON=true

```

Remember that this file can't be commited, it's already in the .gitignore, so if you change the branch,
you need to create this again.

After this, run the project, and you will see the magic.
