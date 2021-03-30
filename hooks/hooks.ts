import { useMutation, useQuery } from 'react-query'
import { createCustomer, getCustomers } from '../services/fetch'
import { ICustomer } from '../interfaces'
import { UseQueryResult } from 'react-query/types/react/types'

export function useCustomers(): UseQueryResult {
    return useQuery('customers', getCustomers)
}

export function useMutationCustomer() {
    // @ts-ignore
    return useMutation('customer', (data: ICustomer) => createCustomer(data))
}
