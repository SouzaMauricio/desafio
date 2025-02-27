import { Schema, model, AggregatePaginateModel } from 'mongoose'
import ITransaction from '../../../domain/types/ITransaction'
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const transactionSchema = new Schema<ITransaction>({
  id: {
    type: String,
    required: true,
    unique: true
  },
  customerDocument: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
}, { timestamps: true })

transactionSchema.plugin(aggregatePaginate)

const Transaction = model<ITransaction, AggregatePaginateModel<ITransaction>>('Transaction', transactionSchema)

export default Transaction
