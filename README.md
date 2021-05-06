# Class 3 - Creating The First Page

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

## Running the Last Example

Run your application, using the command:

```shell
npm run dev
```

Create the folder [components](components), and create a file named
[Layout.tsx](components/Layout.tsx), and paste this content:
```typescript jsx
import React, { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
    children?: ReactNode
    title?: string
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

```