import { Response, Request } from 'express'
import CustomerModel from '../../../../models/customer'
import connectDB from '../../../../midleware/mongodb'

async function Delete(req: Request, res: Response): Promise<Response> {
    try {
        if (req.method == 'DELETE') {
            const {
                query: { id },
            } = req
            await CustomerModel.findByIdAndDelete(id)
            return res.status(200).send('OK')
        } else {
            return res.status(422).send('req_method_not_supported')
        }
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export default connectDB(Delete)
