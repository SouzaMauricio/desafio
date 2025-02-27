export default interface ITransactionPaginated {
  docs: ITransaction[]
  totalDocs: number
  limit: number
  totalPages: number
  page: number
}

interface ITransaction {
  id: string
  customer: {
    name: string
    document: string
  }
  date: Date
  value: number
}
