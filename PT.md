# Aula 4 - Criando o _app.tsx

Nesta classe iremos criar o componente _app.tsx,
que é um componente que substitui algumas das configurações padrão do NextJS,
porque, como Next funciona como páginas da web estáticas, cada uma das páginas do aplicativo
são tratados como páginas separadas, desta forma utilizamos o _app.tsx, para substituir as configurações
padrões do Next, e injetar algumas configurações que vamos criar, em todas
as páginas estáticas.

O NextJS, usa o componente App para inicializar páginas, então cada página que é
inicializada, ele usará essa configuração, e podemos substituir essa configuração,
criando um arquivo chamado [_app.tsx](pages/_app.tsx), na pasta [pages](pages),
isso substituirá a configuração principal.

Por que nós precisamos disso? Porque, se você quiser injetar algum CSS genérico em todas as páginas,
ou configurar um middleware para todas as páginas, você precisará substituir as configurações.

Portanto, crie um arquivo dentro da pasta [pages](pages) chamado _app.tsx e cole o conteúdo:


```typescript jsx
// pages/_app.js
import App from 'next/app'
import React from 'react'

class MyApp extends App {
    render(): JSX.Element {
        const { Component, pageProps } = this.props
        return <Component {...pageProps} />
    }
}

export default MyApp

```

E finalmente copie o código abaixo, para o arquivo [index.tsx](pages/index.tsx):

```typescript jsx
import Link from 'next/link'
import Layout from '../components/Layout'
import * as React from 'react'

function App(): JSX.Element {
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
        </Layout>
    )
}

export default App

```