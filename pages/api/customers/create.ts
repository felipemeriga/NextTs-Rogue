import { Response, Request } from 'express'
import CustomerModel from '../../../models/customer'
import connectDB from '../../../midleware/mongodb'

async function Create(req: Request, res: Response): Promise<Response> {
    try {
        if (req.method == 'POST') {
            const { firstName, lastName, telephone, creditCard } = req.body
            const customerModel = new CustomerModel({
                firstName: firstName,
                lastName: lastName,
                telephone: telephone,
                creditCard: creditCard,
            })
            const createdCustomer = await customerModel.save()
            return res.status(200).send(createdCustomer)
        } else {
            return res.status(422).send('req_method_not_supported')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default connectDB(Create)
