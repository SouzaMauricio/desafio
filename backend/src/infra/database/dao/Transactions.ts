import IPagination from '../../../domain/types/IPagination'
import ITransaction from '../../../domain/types/ITransaction'
import ITransactionPaginated from '../../../domain/types/ITransactionPaginated'
import ITransactionQuery from '../../../domain/types/ITransactionQuery'
import { Connection } from '../connection/connection'
import Transaction from '../models/Transaction'

export class TransactionDao {
  private connection: Connection
  constructor () {
    this.connection = new Connection()
  }

  async getAll(query: ITransactionQuery, pagination: IPagination): Promise<ITransactionPaginated> {
    const conn = await this.connection.createConnection()
    try {
      const aggregate = Transaction.aggregate()
      const match: { [key: string]: any } = {}
      if (query.dateStart) match.date = { $gte: new Date(query.dateStart) }
      if (query.dateEnd) match.date = { ...match.date, $lte: new Date(query.dateEnd) }
      if (query.id) match.id = query.id
      aggregate.match(match)
      aggregate.lookup({
        from: 'customers',
        localField: 'customerDocument',
        foreignField: 'document',
        as: 'customer'
      })
      aggregate.unwind('customer')
      if (query.customerName) {
        aggregate.match({ 'customer.name': new RegExp(query.customerName, 'i') })
      }
      if (query.customerDocument) {
        aggregate.match({ 'customer.document': query.customerDocument })
      }
      const options = {
        page: pagination.page,
        limit: pagination.limit,
        sort: pagination.sort
      }
      const transactions = await Transaction.aggregatePaginate(aggregate, options) as ITransactionPaginated
      return transactions
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async createMany(transactions: ITransaction[]): Promise<any> {
    const conn = await this.connection.createConnection()
    try {
      await this.connection.createConnection()
      const response = await Transaction.insertMany(transactions, { ordered: false })
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
