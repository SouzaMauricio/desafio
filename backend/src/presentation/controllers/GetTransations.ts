import { GetTransactions } from '../../application/usecase/GetTransactions'
import { http } from '../protocols/http'
import { HttpResponse } from '../../application/dto/HttpResponse'

export class GetTransationsController {
  constructor() {}

  async handle(queyParams: any): Promise<http> {
    const {
      dateStart = '',
      dateEnd = '',
      id = '',
      customerName = '',
      customerDocument = '',
      page = 0,
      limit = 10,
      sort = ''
    } = queyParams
    try {
      const getTransactions = new GetTransactions()
      const transaction = await getTransactions.execute({
        dateStart,
        dateEnd,
        id,
        customerName,
        customerDocument,
        page,
        limit,
        sort
      })
      return new HttpResponse(200, transaction)
    } catch (error: any) {
      const statusCode = error?.statusCode || 500
      const message = error?.message || 'Internal server error'
      console.error('GetTransations | error ', error)
      return new HttpResponse(statusCode, { message })
    }
  }
}
