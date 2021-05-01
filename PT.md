# Aula 9 - React Query

React Query, é um pacote NPM incrível que nos ajuda
fazer chamadas assíncronas e criar ganchos diretamente do estado de nossos componentes,
então, por exemplo, você pode chamar uma função HTTP assíncrona e, quando os resultados forem recebidos,
independentemente do sucesso ou não, isso acionará o gancho do componente, para que ele possa
receber os novos dados em seu estado e usá-los.

Como discutimos em algumas últimas aulas, os componentes React e NextJS têm a capacidade de gerenciamento de estado, o estado do componente é um objeto, que pode ser de qualquer tipo e ter muitos
atributos, e toda vez que este objeto sofre algum tipo de mudança, o componente React renderiza
em si, o que significa que todo o componente é atualizado novamente.

A capacidade de gerenciar seu estado, é o padrão do React, cada um dos componentes
pode gerenciar seu estado de maneira idônea, embora, também existam muitos pacotes NPM para gerenciar o estado dos componentes, temos, por exemplo,
o famoso Redux, que é um gestor de estado global, o que significa que o estado é gerido em um estado global entre
todos os componentes.

Mas, um grande problema aparece quando estamos lidando com a atualização do estado dos componentes e chamada de métodos assíncronos,
como são assíncronos, não sabemos quando estão exatamente nos respondendo e, ao mesmo tempo, não podemos travar
nosso componente até que este método tenha uma resposta para nós.

React Query é a solução para isso, ajuda você a criar ganchos no nível do componente,
e chamar funções assíncronas, como chamadas HTTP, e quando essas funções tiverem uma resposta, o
ganchos serão acionados e nosso estado atualizado, como mágica!

Primeiro, precisamos configurar React Query em nosso [_app.tsx](pages/_app.tsx):
```typescript jsx
// pages/_app.js
import App from 'next/app'
import React from 'react'
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

```

Crie um arquivo no diretório [hooks](hooks), denominado [hooks.ts](hooks/hooks.ts):
```typescript jsx
import { useMutation, useQuery } from 'react-query'
import { createCustomer, getCustomers } from '../services/fetch'
import { ICustomer } from '../interfaces'
import { UseMutationResult, UseQueryResult } from 'react-query/types/react/types'
import { queryClient } from '../pages/_app'
import { AxiosResponse } from 'axios'

export function useCustomers(): UseQueryResult {
    return useQuery('customers', getCustomers)
}

export function useMutationCreateCustomer(): UseMutationResult<
    AxiosResponse<any>,
    unknown,
    ICustomer,
    unknown
> {
    return useMutation('customer', (data: ICustomer) => createCustomer(data), {
        onSuccess: async () => {
            await queryClient.clear()
        },
    })
}

```

Agora é hora de testar os endpoints HTTP que criamos, e também os mockups, nós apenas
precisamos criar um gancho para as funções de busca HTTP dentro de nosso componente, então vá para
[index.tsx](pages/index.tsx) e adicione o seguinte código:

```typescript jsx
import Link from 'next/link'
import Layout from '../components/Layout'
import * as React from 'react'
import { ICustomer } from '../interfaces'
import DataRow from '../components/DataRow'
import Loading from '../components/Loading'
import { useCustomers } from '../hooks/hooks'

function App(): JSX.Element {
    const { data } = useCustomers()
    const rowData: ICustomer[] = data as ICustomer[]

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
            {data ? (
                rowData.map((costumer: ICustomer) => <DataRow data={costumer} key={costumer._id} />)
            ) : (
                <Loading />
            )}
        </Layout>
    )
}

export default App

```

Você deve ter notado que a única linha que mudamos foi esta:
```typescript jsx
const { data } = useCustomers()

```

Agora, em vez de obter dados diretamente da amostra que temos, estamos usando o gancho React Query `` `useCustomers ()` ``.
Claro que o mock vai interceptar isso e recuperar os mesmos dados de amostra,
mas agora temos todo um fluxo de chamada HTTP pronto.

Antes de executar, lembre-se que na última aula, na configuração HTTP, definimos uma variável booleana,
para disparar quando queremos usar ```MOCK_ON```, ou não.

Vamos controlar isso como uma variável de ambiente, primeiro crie um arquivo na raiz do seu projeto chamado
[next.config.js](next.config.js) e adicione o seguinte conteúdo:

```javascript
module.exports = {
    env: {
        REACT_MOCK_ON: process.env.REACT_MOCK_ON
    },
}

```

Este arquivo é para o NextJS reconfigurar as variáveis ​​de ambiente, à medida que as páginas são renderizadas no lado do servidor,
você precisa disso para permitir que o NextJS saiba que eles existem.

Agora, crie um arquivo chamado [.env](.env), que será onde definiremos as variáveis de ambiente:

```shell
REACT_MOCK_ON=true

```


Lembre-se que este arquivo não pode ser confirmado, ele já está no .gitignore, então se você alterar o branch,
você precisa criar isso novamente.

Depois disso, execute o projeto e você verá a mágica.