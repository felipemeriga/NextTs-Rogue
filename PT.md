# Aula 3 - Criando A Primeira Página


## Como Rodar o Projeto Aula Passada

Use o commando a seguir, na raiz do seu projeto:
```shell
npm run dev
```

Crie a uma pasta chamada [components](components), e um arquivo dentro dela, chamado
[Layout.tsx](components/Layout.tsx), e copie/cole este conteúdo no arquivo.
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
                <div className="container">{children}</div>
            </main>
        </>
    )
}

export default Layout

```
