# Class 6 - Creating the Table Component

### [SWITCH TO PORTUGUESE VERSION](./PT.md)

In this class we are going to create our simple table component,
and add some dummy that to that table, and off course some style too.

Now it's time to create some interfaces for the application, as we are dealing with customers,
we will create an interface for it, so create a folder called [interfaces](interfaces), and create a
file named [index.ts](interfaces/index.ts), with the following content:
```typescript
export type ICustomer = {
    _id: string
    firstName?: string
    lastName?: string
    telephone?: string
    creditCard?: string
}

```

Then, create a file under the folder [utils](utils), called [sample-data.ts](utils/sample-data.ts)
and paste the following content:

```typescript jsx
import { ICustomer } from '../interfaces'

/** Dummy user data. */
export const sampleCustomerData: ICustomer[] = [
    {
        _id: '1',
        firstName: 'Darth',
        lastName: 'Vader',
        telephone: '519(3533)535-16-53',
        creditCard: '4633 7014 8828 1403',
    },
    {
        _id: '2',
        firstName: 'Obi-Wan',
        lastName: 'Kenobi',
        telephone: '8(92)356-98-20',
        creditCard: '4462 2945 5530 4205',
    },
    {
        _id: '3',
        firstName: 'Han',
        lastName: 'Solo',
        telephone: '7(22)578-98-88',
        creditCard: '4655 6225 7033 8898',
    },
    {
        _id: '4',
        firstName: 'R2',
        lastName: 'D2',
        telephone: '965(56)083-59-90',
        creditCard: '4269 3224 9443 2855',
    },
    {
        _id: '5',
        firstName: 'Jyn',
        lastName: 'Erso',
        telephone: '005(34)310-84-90',
        creditCard: '4556 4324 4187 1006',
    },
]

```

This is a dummy set of data, that we are going to use for the moment, and also 
we are going to use this when we create our mockups.

After that, create the following component, under [components](components), named
[DataRow.tsx](components/DataRow.tsx), and paste the following content:

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

You might have noticed that we need to add some styles, so go to [styles.css](styles.css) file,
and add the following lines:

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
