import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
    children?: ReactNode
    title?: string
}

function Layout({ children }: Props) {
    return (
        <>
            <Head>
                <title>Next Fauna CRUD</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="container">{children}</div>
            </main>
        </>
    )
}

export default Layout
