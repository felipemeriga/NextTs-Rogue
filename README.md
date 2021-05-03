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

In this class we will create the API for fetching all the users, and also creating a single user.

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
