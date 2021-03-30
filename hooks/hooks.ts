import { useMutation, useQuery } from 'react-query'
import { createCustomer, getCustomer, getCustomers } from '../services/fetch'
import { ICustomer } from '../interfaces'
import { UseQueryResult } from 'react-query/types/react/types'

export function useCustomers(): UseQueryResult {
    return useQuery('customers', getCustomers)
}

export function useMutationCreateCustomer() {
    // @ts-ignore
    return useMutation('customer', (data: ICustomer) => createCustomer(data))
}

export function useCustomer(id: string): UseQueryResult {
    return useQuery(['customer', id], () => getCustomer(id), {
        enabled: !!id,
    })
}
