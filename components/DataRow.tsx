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
