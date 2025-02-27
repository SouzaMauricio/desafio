export default interface ITransactionPaginated {
  docs: ITransaction[]
  totalDocs: Number
  limit: Number
  totalPages: Number
  page: Number
}

interface ITransaction {
  id: String
  customerDocument: String
  date: Date
  value: Number
}
