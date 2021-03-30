// pages/_app.js
import React from 'react'
import App from 'next/app'
import '../styles.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'

const queryClient = new QueryClient()

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
