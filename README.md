# Class 18 - API Update Customer

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

Now it's time to create our last API! The last one, and then we will
be ready to deploy it, so, create a file in the
directory [pages/api/customers/[id]/update.ts](pages/api/customers/[id]/update.ts):

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

This was the only piece of code that we needed, and now our application it's
done, we finally will be able to deploy it!