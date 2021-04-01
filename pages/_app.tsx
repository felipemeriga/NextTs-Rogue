// pages/_app.js
import React from 'react'
import App from 'next/app'
import '../styles.css'
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { NextPageContext } from 'next'

export const queryClient = new QueryClient()

export const queryCache = new QueryCache({
    onError: (error) => {
        console.log(error)
    },
})

interface Context extends NextPageContext {
    // any modifications to the default context, e.g. query types
}

interface IProps {
    ctx: Context
    Component: any
}

class MyApp extends App {
    // @ts-ignore
    static async getInitialProps({ Component, ctx }: IProps): Promise<any> {
        return {
            pageProps: {
                // Call page-level getInitialProps
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
            },
        }
    }

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
