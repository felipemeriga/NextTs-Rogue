# Class 15 - MongoDB Connection

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

Now we have mostly finished the UI part of our app, all the components
are done, we have all the HTTP functions working with the Hooks, but if remember hooks
it's just for testing, and now that we are going to start using real data, but first we would need a database where we could place this data, and for this we will use the 
NoSQL database MongoDB, in this class, please follow the video, that I will help you
how to create a MongoDB account and also a free database, the good thing is that
you can have this test remote database for free.

After following the steps of creating the database, and having everything configured, we will
go back to our code.

For connecting to MongoDB, we would need the connection string, and in the video you can check how to take 
it directly from the MongoDB console, and we would need this string for our code, but as this is sensitive,
we will inject it on NextJS application as an environment variable, and always remember to don't 
push things you have in your .env file.

On [next.config.js](next.config.js) let's add a new environment variable definition, the entire file will be like this:
```javascript
module.exports = {
    env: {
        REACT_MOCK_ON: process.env.REACT_MOCK_ON,
        MONGODB_URL: process.env.MONGODB_URL,
    },
}

```

Now add your ```MONGODB_URL``` environment variable value on the [.env](.env) file that you have, and 
let's create a constant in the code for receiving this, go to [utils/constants.ts](utils/constants.ts) and
add the following line:
```typescript
export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:'

```

Now we will create all MongoDB connection wrapper, a wrapper it's basically a function that wrapps another piece of code,
and this wrapped code, can access properties from the wrapper, like for example, a conenction with the database.

Let's create a new file on the path [midleware/mongodb.ts](midleware/mongodb.ts), and paste the following code:
```typescript
import * as mongoose from 'mongoose'
import { MONGODB_URL } from '../utils/constants'

const connectDB = (handler: Function) => async (req: Request, res: Response): Promise<Function> => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res)
    }
    // Use new db connection
    await mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    return handler(req, res)
}

export default connectDB

```

Now that we have the wrapper, before we test it out, we need to create the documents and models,
MongoDB is a document database, and we need to define the kind of data we are going to add, so as we have
our interface Customer, that represents a single customer, we will create a customer model, so we can add those
customers to the database. Create a file on the following path [models/customer.ts](models/customer.ts), and add the 
content:
```typescript
import { Document, Schema } from 'mongoose'
import { ICustomer } from '../interfaces'
import mongoose from 'mongoose'

// @ts-ignore
export interface CustomerModelInterface extends ICustomer, Document {}

export const CustomerSchema: Schema = new Schema({
    firstName: String,
    lastName: String,
    telephone: String,
    creditCard: String,
})
// @ts-ignore
mongoose.models = {}

const CustomerModel = mongoose.model<CustomerModelInterface>('customer', CustomerSchema)

export default CustomerModel

```

Now we have everything ready with MongoDB, we just need now to start creating the API layer, where all our
HTTP requests will be directed, and then, the APIs will communicate with the database using the wrapper that we created.


