import { TransactionDao } from '../../infra/database/dao/Transactions'
import { CustomerDao } from '../../infra/database/dao/Customers'

export class CreateTransaction {
  transactionDao: TransactionDao
  customerDao: CustomerDao
  constructor() {
    this.transactionDao = new TransactionDao()
    this.customerDao = new CustomerDao()
  }

  async execute(body: Buffer): Promise<any> {
    const transactionData = body.toString('utf-8').split('\n')
    const response = await this.getData(transactionData)
    await Promise.all([
      this.customerDao.createMany(Object.values(response.customers)),
      this.transactionDao.createMany(Object.values(response.transactions))
    ])
    return { message: 'Transactions created successfully' }
  }

  private getData(transactionData: any): any {
    const data = {
      transactions: {},
      customers: {}
    } as any
    for (const item of transactionData) {
      const transactionData: any = {}
      item.split(';').forEach((item: string) => {
        const [key, value] = item.split(':')
        transactionData[key] = value
      })
      if (!transactionData.nome || !transactionData.cpfCnpj) {
        console.error('CreateTransaction | error | invalid data ', transactionData)
      }
      data.transactions[transactionData.id] = {
        id: transactionData.id,
        value: transactionData.valor,
        customerDocument: transactionData.cpfCnpj,
        date: transactionData.data,
      }
      data.customers[transactionData.cpfCnpj] = {
        name: transactionData.nome || 'undefined',
        document: transactionData.cpfCnpj || 'undefined'
      }
    }
    return data
  }
}