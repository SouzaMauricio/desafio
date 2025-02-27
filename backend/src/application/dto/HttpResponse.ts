import { http } from '../../presentation/protocols/http'

export class HttpResponse implements http {
  public readonly statusCode: number
  public readonly body: any
  public readonly headers: any

  constructor(statusCode: number, body: any, headers?: any) {
    this.statusCode = statusCode
    this.body = body
    this.headers = headers || { 'Content-Type': 'application/json' }
  }
}
