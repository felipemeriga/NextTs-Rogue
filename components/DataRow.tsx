import Link from 'next/link'
import { ICustomer } from '../interfaces'

interface IProps {
    data: ICustomer
}

const DataRow = ({ data }: IProps) => (
    <div className="dataRow">
        <p>
            <Link href={'/customers/[id]'} as={`/customers/${data.id}`}>
                <a>
                    {data.firstName} {data.lastName}
                </a>
            </Link>
        </p>
        <p className={`num`}>{data.telephone}</p>
        <p className={`creditCard`}>{data.creditCard}</p>
    </div>
)

export default DataRow
