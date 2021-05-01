import { useMutation, useQuery } from 'react-query'
import { createCustomer, getCustomers } from '../services/fetch'
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
