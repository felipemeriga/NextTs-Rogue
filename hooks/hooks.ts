import { useMutation, useQuery } from 'react-query'
import {
    createCustomer,
    deleteCustomer,
    getCustomer,
    getCustomers,
    updateCustomer,
} from '../services/fetch'
import { ICustomer } from '../interfaces'
import { UseMutationResult, UseQueryResult } from 'react-query/types/react/types'
import { queryClient } from '../pages/_app'
import { AxiosResponse } from 'axios'

export function useCustomers(): UseQueryResult {
    return useQuery('customers', getCustomers)
}

export function useMutationCreateCustomer(): UseMutationResult<
    AxiosResponse<any>,
    unknown,
    ICustomer,
    unknown
> {
    return useMutation('customer', (data: ICustomer) => createCustomer(data), {
        onSuccess: async () => {
            await queryClient.clear()
        },
    })
}

export function useCustomer(id: string): UseQueryResult {
    return useQuery(['customer', id], () => getCustomer(id), {
        enabled: !!id,
    })
}

export function useMutationDeleteCustomer(): UseMutationResult<
    AxiosResponse<any>,
    unknown,
    string,
    unknown
> {
    return useMutation('customer', (id: string) => deleteCustomer(id))
}

export function useMutationUpdateCustomer(): UseMutationResult<
    ICustomer,
    unknown,
    ICustomer,
    unknown
> {
    return useMutation('customer', (data: ICustomer) => updateCustomer(data))
}
