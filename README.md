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
        firstName: 'Rhys',
        lastName: 'Thorogood',
        telephone: '525-110-3249',
        creditCard: '5274561981781908',
    },
    {
        _id: '2',
        firstName: 'Emlen',
        lastName: 'Coombs',
        telephone: '269-417-9841',
        creditCard: '3564749194727131',
    },
    {
        _id: '3',
        firstName: 'Holly',
        lastName: 'Fallen',
        telephone: '135-152-2366',
        creditCard: '3569686548587750',
    },
    {
        _id: '4',
        firstName: 'Jo',
        lastName: 'Malek',
        telephone: '381-905-2232',
        creditCard: '5602230308519481',
    },
    {
        _id: '5',
        firstName: 'Brandyn',
        lastName: 'Hunnam',
        telephone: '595-920-3257',
        creditCard: '3583343896760025',
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


Excelente! Agora, se você executar seu projeto, poderá verificar uma tabela com todos os dados fictícios!