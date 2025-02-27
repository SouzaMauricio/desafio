import { CreateTransaction } from '../../application/usecase/CreateTransactions'
import { http } from '../protocols/http'
import { HttpResponse } from '../../application/dto/HttpResponse'

export class CreateTransationsController {
  constructor() {}

  async handle(body: Buffer): Promise<http> {
    try {
      const createTransaction = new CreateTransaction()
      const transaction = await createTransaction.execute(body)
      return new HttpResponse(200, transaction)
    } catch (error: any) {
      const statusCode = error?.statusCode || 500
      const message = error?.message || 'Internal server error'
      console.error('CreateTransations | error ', error)
      return new HttpResponse(statusCode, { message })
    }
  }
}
