import Link from 'next/link';

type Props = {
    id?: string,
    firstName?: string,
    lastName?: string,
    telephone?: string,
    creditCard?: string,
    loading?: boolean,
}

const DataRow = ({id, firstName, lastName, telephone, creditCard, loading}: Props) => (
    <>
        <div className="dataRow">
            <p className={loading ? 'loading' : ''}>
                <Link href="/customers/[id]" as={`/customers/${id}`}>
                    <a>
                        {firstName} {lastName}
                    </a>
                </Link>
            </p>
            <p className={`num ${loading ? 'loading' : ''}`}>{telephone}</p>
            <p className={`creditCard num ${loading ? 'loading' : ''}`}>{creditCard}</p>
        </div>
    </>
)

export default DataRow