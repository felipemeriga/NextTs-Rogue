# Aula 12 - Componente para Deletar e Vizualisar Customer

Agora estamos prontos para criar o componente para visualizar um único usuário,
e também deletar, se quisermos.

Então, quando clicamos em um dos usuários da tabela, ele nos leva ao URL
```/customer/[id]``` onde o id será substituído pelo ID do usuário, o bom é que
NextJS já faz isso automaticamente para nós, você só precisa criar uma pasta chamada
[/pages/customers/[id]](/pages/customers/[id]), e uma página index.tsx dentro dela, e preencha com o
seguinte código:

```typescript jsx
import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../../../components/Layout'
import Link from 'next/link'
import { useCustomer, useMutationDeleteCustomer } from '../../../hooks/hooks'
import { ICustomer } from '../../../interfaces'
import Loading from '../../../components/Loading'

function Customer(): JSX.Element {
    const router = useRouter()
    const { id } = router.query

    const mutation = useMutationDeleteCustomer()

    const onClick = (): void => {
        mutation.mutate(String(id))
    }

    if (mutation.isSuccess) {
        router.push('/')
    }

    const { data, error } = useCustomer(String(id))
    const customer: ICustomer = data as ICustomer

    if (error || mutation.error) return <div>failed to load</div>

    return (
        <Layout>
            <h1>Customer</h1>
            <hr />
            {customer ? (
                <div>
                    <p className="name">
                        {customer.firstName} {customer.lastName}
                    </p>
                    <p className="num">{customer.telephone}</p>
                    <p className="num">{customer.creditCard}</p>

                    <div className="buttons">
                        <Link href={'/customers/[id]/update'} as={`/customers/${id}/update`}>
                            <a className="editButton">Edit</a>
                        </Link>
                        <button className="deleteButton" onClick={onClick}>
                            Delete
                        </button>
                    </div>
                </div>
            ) : (
                <Loading />
            )}
        </Layout>
    )
}

export default Customer

```

Você pode notar que agora estamos usando dois hooks, o ```useCustomer``` para obter um único usuário,
e ```useMutationDeleteCustomer``` para excluir este cliente.

Vamos dar algum estilo a essa página, em [styles.css](styles.css), adicionar o seguinte conteúdo abaixo
aquele que já existe lá.

```css
.name {
    font-size: 1.25rem;
    font-weight: 600;
}
.buttons {
    text-align: right;
}
.editButton {
    display: inline-block;
    border: 1px solid #0070f3;
    border-radius: 3px;
    padding: 0.25rem 1rem;
    margin-right: 0.25rem;
}
.editButton:hover {
    text-decoration: none;
}
.deleteButton {
    background-color: inherit;
    border: 1px solid #d32f2f;
    border-radius: 3px;
    padding: 0.25rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    color: #d32f2f;
}

```