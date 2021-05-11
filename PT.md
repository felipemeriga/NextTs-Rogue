# Aula 6 - Criando o Componente Tabela

Nesta aula, vamos criar nosso componente de tabela simples,
e adicionar alguns dados de teste, e claro, algum estilo também.

Agora é hora de criar algumas interfaces para o aplicativo, pois estamos lidando com os clientes,
vamos criar uma interface para eles, então crie uma pasta chamada [interfaces](interfaces), e crie um
arquivo denominado [index.ts](interfaces/index.ts), com o seguinte conteúdo:
```typescript
export type ICustomer = {
    _id: string
    firstName?: string
    lastName?: string
    telephone?: string
    creditCard?: string
}

```

Agora crie um arquivo na pasta [utils](utils), chamado [sample-data.ts](utils/sample-data.ts)
e cole o seguinte conteúdo:

```typescript jsx
import { ICustomer } from '../interfaces'

/** Dummy user data. */
export const sampleCustomerData: ICustomer[] = [
    {
        _id: '1',
        firstName: 'Rhys',
        lastName: 'Thorogood',
        telephone: '525-110-3249',
        creditCard: '5274561981781908',
    },
    {
        _id: '2',
        firstName: 'Emlen',
        lastName: 'Coombs',
        telephone: '269-417-9841',
        creditCard: '3564749194727131',
    },
    {
        _id: '3',
        firstName: 'Holly',
        lastName: 'Fallen',
        telephone: '135-152-2366',
        creditCard: '3569686548587750',
    },
    {
        _id: '4',
        firstName: 'Jo',
        lastName: 'Malek',
        telephone: '381-905-2232',
        creditCard: '5602230308519481',
    },
    {
        _id: '5',
        firstName: 'Brandyn',
        lastName: 'Hunnam',
        telephone: '595-920-3257',
        creditCard: '3583343896760025',
    },
]

```

Este é um conjunto fictício de dados, que usaremos no momento, e também
vamos usar isso quando criarmos nossos mockups.

Depois disso, crie o seguinte componente, em [components](components), denominado
[DataRow.tsx](components/DataRow.tsx) e cole o seguinte conteúdo:
```typescript jsx
import Link from 'next/link'
import React from 'react'
import { ICustomer } from '../interfaces'

interface IProps {
    data: ICustomer
}

function DataRow({ data }: IProps): JSX.Element {
    return (
        <div className="dataRow">
            <p>
                <Link href={'/customers/[id]'} as={`/customers/${data._id}`}>
                    <a>
                        {data.firstName} {data.lastName}
                    </a>
                </Link>
            </p>
            <p className={`num`}>{data.telephone}</p>
            <p className={`creditCard`}>{data.creditCard}</p>
        </div>
    )
}

export default DataRow

```


Você deve ter notado que precisamos adicionar alguns estilos, então vá para o arquivo [styles.css](styles.css),
e adicione as seguintes linhas:

```css
.dataRow {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0 32px;
    border-top: 1px solid #eaeaea;
}

.num {
    font-family: Roboto, 'Open Sans', serif;
}

```

Agora podemos adicionar tudo ao [index.tsx](pages/index.tsx)

```typescript jsx
import Link from 'next/link'
import Layout from '../components/Layout'
import * as React from 'react'
import { sampleCustomerData } from '../utils/sample-data'
import { ICustomer } from '../interfaces'
import DataRow from '../components/DataRow'

function App(): JSX.Element {
    const rowData: ICustomer[] = sampleCustomerData as ICustomer[]

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
            {rowData.map((costumer: ICustomer) => (
                <DataRow data={costumer} key={costumer._id} />
            ))}
        </Layout>
    )
}

export default App

```