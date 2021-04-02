import { Document, Schema } from 'mongoose'
import { ICustomer } from '../interfaces'
import mongoose from 'mongoose'

// @ts-ignore
export interface CustomerModelInterface extends ICustomer, Document {}

export const CustomerSchema: Schema = new Schema({
    firstName: String,
    lastName: String,
    telephone: String,
    creditCard: String,
})
// @ts-ignore
mongoose.models = {}

const CustomerModel = mongoose.model<CustomerModelInterface>('customer', CustomerSchema)

export default CustomerModel
