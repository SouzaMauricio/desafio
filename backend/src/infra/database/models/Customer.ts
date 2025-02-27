import { Schema, model } from 'mongoose'

interface ICustomer {
  name: string
  document: string
}

const customerSchema = new Schema<ICustomer>({
  name: {
    type: String,
    required: true
  },
  document: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true })

customerSchema.index({ document: 1 }, { unique: true })

const Customer = model<ICustomer>('Customer', customerSchema)

export default Customer
