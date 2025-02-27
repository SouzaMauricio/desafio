import ITransactionQueryParams from '../../domain/types/ITransactionQueryParams'
import { TransactionDao } from '../../infra/database/dao/Transactions'

export class GetTransactions {
  transactionDao: TransactionDao
  constructor() {
    this.transactionDao = new TransactionDao()
  }

  async execute(queyParams: ITransactionQueryParams): Promise<any> {
    const query = {
      dateStart: queyParams.dateStart,
      dateEnd: queyParams.dateEnd,
      id: queyParams.id,
      customerName: queyParams.customerName,
      customerDocument: queyParams.customerDocument
    }
    const pagination = {
      page: queyParams.page,
      limit: queyParams.limit,
      sort: queyParams.sort
    }
    const response = await this.transactionDao.getAll(query, pagination)
    return response
  }
}