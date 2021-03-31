// pages/_app.js
import React from 'react'
import App from 'next/app'
import '../styles.css'
import {QueryCache, QueryClient, QueryClientProvider} from 'react-query'
import { Hydrate } from 'react-query/hydration'

export const queryClient = new QueryClient()

export const queryCache = new QueryCache({
    onError: error => {
        console.log(error)
    },
})

class MyApp extends App {
    // @ts-ignore
    static async getInitialProps({ Component, ctx }) {
        return {
            pageProps: {
                // Call page-level getInitialProps
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
            },
        }
    }

    render() {
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
