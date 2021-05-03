# Class 16 - Criando a Primeira API

Como discutimos nas primeiras aulas do curso, React é um
framework de frontend Javascript / Typescript e não tem a capacidade de
criação de servidores web ou algo parecido, o que significa que se você estiver usando
React como seu framework de frontend, você precisaria de um backend escrito em algum outro framework, e
linguagem de programação.

A coisa boa sobre NextJS, é que também podemos criar a parte API com isso, e como NextJS é
destina-se a funcionar em um ambiente serverless, o que significa, sem qualquer servidor, como a capacidade automática
que NextJS tem que criar páginas quando você cria arquivos dentro da pasta [pages](pages), ele também tem o
capacidade de criar APIs também, você só precisa criar uma pasta chamada api, dentro do diretório [pages](pages), que
qualquer arquivo que você colocar lá será tratado da mesma maneira que as páginas, mas desta vez, como um endpoint da API.

Precisamos criar os seguintes endpoints de API:
- Obtenha todos os clientes salvos no banco de dados
- Obtenha um único cliente
- Crie um novo cliente
- Excluir um cliente existente
- Atualizar um cliente existente

Nesta aula iremos criar a API para buscar todos os clientes, e também criar um único cliente.

Para a primeira API, que servirá como um endpoint GET, para obter todos os clientes, primeiro
crie o seguinte arquivo em [pages/api/customers/index.ts](pages/api/customers/index.ts) e cole o
seguinte trecho de código:

```typescript
import connectDB from '../../../midleware/mongodb'
import { ICustomer } from '../../../interfaces'
import { Response, Request } from 'express'
import CustomerModel from '../../../models/customer'

async function handler(_req: Request, res: Response): Promise<Response> {
    try {
        const queryResult: ICustomer[] = await CustomerModel.find({})
        return res.status(200).send(queryResult)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default connectDB(handler)

```

Depois disso, crie a API de criação do cliente, no arquivo [pages/api/customers/create.ts](pages/api/customers/create.ts),
com o seguinte código:
```typescript
import { Response, Request } from 'express'
import CustomerModel from '../../../models/customer'
import connectDB from '../../../midleware/mongodb'

async function Create(req: Request, res: Response): Promise<Response> {
    try {
        if (req.method == 'POST') {
            const { firstName, lastName, telephone, creditCard } = req.body
            const customerModel = new CustomerModel({
                firstName: firstName,
                lastName: lastName,
                telephone: telephone,
                creditCard: creditCard,
            })
            const createdCustomer = await customerModel.save()
            return res.status(200).send(createdCustomer)
        } else {
            return res.status(422).send('req_method_not_supported')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default connectDB(Create)

```


Agora, não se esqueça de transformar a variável de ambiente ```REACT_MOCK_ON``` para false, para desativar os mocks
e adicione a string de conexão ```MONGODB_URL``` para que o NextJS seja capaz de se conectar ao seu banco de dados, não se esqueça
para dar uma olhada na última aula como criar o banco de dados MongoDB gratuitamente e também definir as permissões corretas e
crie o banco de dados adequado, para que você não receba um erro não autorizado.