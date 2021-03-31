import {useMutation, useQuery} from 'react-query'
import {
    createCustomer,
    deleteCustomer,
    getCustomer,
    getCustomers,
    updateCustomer,
} from '../services/fetch'
import { ICustomer } from '../interfaces'
import { UseQueryResult } from 'react-query/types/react/types'
import {queryClient} from "../pages/_app";

export function useCustomers(): UseQueryResult {
    return useQuery('customers', getCustomers)
}

export function useMutationCreateCustomer() {
    return useMutation('customer', (data: ICustomer) => createCustomer(data), {
        onSuccess: async () => {
            await queryClient.clear()
        }
    })
}

export function useCustomer(id: string): UseQueryResult {
    return useQuery(['customer', id], () => getCustomer(id), {
        enabled: !!id,
    })
}

export function useMutationDeleteCustomer() {
    return useMutation('customer', (id: string) => deleteCustomer(id))
}

export function useMutationUpdateCustomer() {
    return useMutation('customer', (data: ICustomer) => updateCustomer(data))
}
