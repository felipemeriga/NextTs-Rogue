# Class 16 - Creating the First API

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

Like we discussed in the first classes of the course, React is a
frontend Javascript/Typescript framework, and doesn't have the capability of 
creating webservers or something like this, which means that if you are using plain
React as your frontend framework, you would need a backend written in some another framework, and
programming language.

The good thing about NextJS, is that we can also create the API part with that, and as NextJS it's
meant to run in a serverless environment, which means, without any server, like the automatic capability 
that NextJS has to create pages when you create files inside [pages](pages) folder, it also has the 
capability of creating APIs too, you just need to create a folder called api, inside [pages](pages) directory, that
any file that you place there will be treated in the same way pages are, but this time, as an API endpoint.

We need to create the following API endpoints:
- Get all the customers saved in the database
- Get one single customer
- Create a new customer
- Delete an existing customer
- Update an existing customer

In this class we will create the API for fetching all the customers, and also creating a single customer.

For the first API, that will serve as a GET endpoint, for getting all the customers, first 
create the following file on [pages/api/customers/index.ts](pages/api/customers/index.ts), and paste the
following piece of code:

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

After that create the create customer API, in the file [pages/api/customers/create.ts](pages/api/customers/create.ts),
with the following code:
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

Now, don't forget to turn the environment variable ```REACT_MOCK_ON``` to false, to disable the mocks
and add the ```MONGODB_URL``` connection string so NextJS will be able to connect to your database, don't forget
to take a look in the last class how to create the MongoDB database for free, and also set the right permissions and 
create the proper database, so you won't receive an unauthorized error.
