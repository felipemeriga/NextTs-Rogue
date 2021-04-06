// pages/_app.js
import App from 'next/app'
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
