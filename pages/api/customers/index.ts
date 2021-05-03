import connectDB from '../../../midleware/mongodb'
import { ICustomer } from '../../../interfaces'
import { Response, Request } from 'express'
import CustomerModel from '../../../models/customer'

async function handler(_req: Request, res: Response): Promise<Response> {
    try {
        const queryResult: ICustomer[] = await CustomerModel.find({})
        return res.status(200).send(queryResult)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default connectDB(handler)
