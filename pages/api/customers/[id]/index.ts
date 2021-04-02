import { Request, Response } from 'express'
import { ICustomer } from '../../../../interfaces'
import CustomerModel from '../../../../models/customer'
import connectDB from '../../../../midleware/mongodb'

async function handler(req: Request, res: Response): Promise<Response> {
    try {
        const {
            query: { id },
        } = req
        const queryResult: ICustomer | null = await CustomerModel.findById(id)
        return res.status(200).send(queryResult)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default connectDB(handler)
