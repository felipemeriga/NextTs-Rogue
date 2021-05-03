# Class 17 - API Get/Delete Customer

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

Let's now create an API for querying a specific customer from the database, from
our API.

In same way we've created the pages, create a file under the directory
[/pages/api/customers/[id]/index.ts](/pages/api/customers/[id]/index.ts), and place the following content in that:
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

Before doing the delete API, let's do some refactoring in the code, by default NextJS,
will follow the directory structure as the HTTP path for sending the DELETE request, so in localhost
for example, a proper delete request URL to the API serve, would be:
```
http://localhost:3000/api/customers/[id]/delete
```

So we need to change this on [services/fetch.ts](services/fetch.ts), so replace the ```deleteCustomer``` method of that
file, for this one:
```typescript
export async function deleteCustomer(id: string): Promise<AxiosResponse> {
    return await getAxiosInstance().delete(`/customers/${id}/delete`)
}

```

Now we are ready to create the delete API, create it on the following directory,
[pages/api/customers/[id]/delete](pages/api/customers/[id]/delete), and paste this code:
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

Finally, there is still one thing that we need to refactor, which is our mock, as we have changed
the endpoint for the DELETE request, let's fix our mock intercept DELETE function.

In [services/mock.ts](services/mock.ts), replace the delete part to this one:
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