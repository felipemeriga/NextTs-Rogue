import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
    children?: ReactNode
}

function Layout({ children }: Props): JSX.Element {
    return (
        <>
            <Head>
                <title>Next CRUD App</title>
            </Head>

            <main>
                <div>{children}</div>
            </main>
        </>
    )
}

export default Layout
