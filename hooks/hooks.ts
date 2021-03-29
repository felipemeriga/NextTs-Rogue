import {useQuery} from "react-query"
import {getCustomers} from "../services/fetch"


export function useCustomers() {
    return useQuery('customers', getCustomers)
}
