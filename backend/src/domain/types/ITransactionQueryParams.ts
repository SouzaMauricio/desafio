export default interface ITransactionQueryParams {
  dateStart: string
  dateEnd: string
  id: string
  customerName: string
  customerDocument: string
  page: number
  limit: number
  sort: string
}
