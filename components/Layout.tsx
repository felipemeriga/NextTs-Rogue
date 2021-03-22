import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
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

export default Layout
