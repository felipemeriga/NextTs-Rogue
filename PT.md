# Aula 18 - Criando API de Atualizar Customer

Agora é hora de criar nossa última API! Então, crie um arquivo no
diretório [pages/api/customers/[id]/update.ts](pages/api/customers/[id]/update.ts):
```typescript
import { Response, Request } from 'express'
import CustomerModel from '../../../../models/customer'
import connectDB from '../../../../midleware/mongodb'

async function Update(req: Request, res: Response): Promise<Response> {
    try {
        if (req.method == 'PUT') {
            const { firstName, lastName, telephone, creditCard } = req.body
            const {
                query: { id },
            } = req
            await CustomerModel.findByIdAndUpdate(id, {
                firstName: firstName,
                lastName: lastName,
                telephone: telephone,
                creditCard: creditCard,
            })
            return res.status(200).send('OK')
        } else {
            return res.status(422).send('req_method_not_supported')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default connectDB(Update)

```


Este era o único trecho de código de que precisávamos, e agora nosso aplicativo está terminado ,
finalmente seremos capazes de implantá-lo!