import * as mongoose from 'mongoose'
import { MONGODB_URL } from '../utils/constants'

const connectDB = (handler: Function) => async (req: Request, res: Response): Promise<Function> => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return handler(req, res)
    }
    // Use new db connection
    await mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    return handler(req, res)
}

export default connectDB
