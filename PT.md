# Aula 17 - Criar API para Buscar e Deletar Customers

Vamos agora criar uma API para consultar um cliente específico do banco de dados, de
nossa API.

Da mesma forma que criamos as páginas, crie um arquivo no diretório
[/pages/api/customers/[id]/index.ts](/pages/api/customers/[id]/index.ts) e coloque o seguinte conteúdo nele:
```typescript
import { Request, Response } from 'express'
import { ICustomer } from '../../../../interfaces'
import CustomerModel from '../../../../models/customer'
import connectDB from '../../../../midleware/mongodb'

async function handler(req: Request, res: Response): Promise<Response> {
    try {
        const {
            query: { id },
        } = req
        const queryResult: ICustomer | null = await CustomerModel.findById(id)
        return res.status(200).send(queryResult)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default connectDB(handler)

```

Antes de excluir a API, vamos fazer uma refatoração no código, por padrão NextJS,
seguirá a estrutura do diretório como o caminho HTTP para enviar a solicitação DELETE, portanto, em localhost
por exemplo, um URL de solicitação de exclusão adequado para o servidor da API seria:
```
http://localhost:3000/api/customers/[id]/delete
```

Portanto, precisamos mudar isso em [services/fetch.ts](services/fetch.ts), então substitua o método ```deleteCustomer``` desse
arquivo, para este:
```typescript
export async function deleteCustomer(id: string): Promise<AxiosResponse> {
    return await getAxiosInstance().delete(`/customers/${id}/delete`)
}

```

Agora estamos prontos para criar a API de exclusão, crie-a no seguinte diretório,
[pages/api/customers/[id]/delete](pages/api/customers/[id]/delete) e cole este código:
```typescript
import { Response, Request } from 'express'
import CustomerModel from '../../../../models/customer'
import connectDB from '../../../../midleware/mongodb'

async function Delete(req: Request, res: Response): Promise<Response> {
    try {
        if (req.method == 'DELETE') {
            const {
                query: { id },
            } = req
            await CustomerModel.findByIdAndDelete(id)
            return res.status(200).send('OK')
        } else {
            return res.status(422).send('req_method_not_supported')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default connectDB(Delete)

```

Finalmente, ainda há uma coisa que precisamos refatorar, que é o nosso mock, pois mudamos
o ponto de extremidade para a solicitação DELETE, vamos corrigir nossa função DELETE de interceptação.

Em [services/mock.ts](services/mock.ts), substitua a parte de exclusão por esta:
```typescript
    mock.onDelete(url).reply(function (config) {
        if (config.url) {
            const id = String(config.url.match(/\d/g))
            const index: number = sampleCustomerData.findIndex(
                (value: ICustomer) => value._id === id
            )
            sampleCustomerData.splice(index, 1)
            return [200, 'response']
        } else {
            return [500, 'response']
        }
    })

```