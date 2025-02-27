import ICustomer from '../../../domain/types/ICustomer'
import { Connection } from '../connection/connection'
import Customer from '../models/Customer'

export class CustomerDao {
  private connection: Connection
  constructor () {
    this.connection = new Connection()
  }

  async createMany(customers: ICustomer[]): Promise<any> {
    const conn = await this.connection.createConnection()
    try {
      const response = await Customer.insertMany(customers, { ordered: true })
      return response
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
