import axios, { AxiosResponse } from 'axios'
import ITransactionPaginated from '@/interfaces/iTransactionPaginated'

export const getTransactions = async (query: string): Promise<ITransactionPaginated> => {
  const response = await axios.get(`http://localhost:3001/transactions?${query}`)
  return response.data
}

export const createTransactions = async (body: FormData): Promise<AxiosResponse> => {
  return axios.post('http://localhost:3001/transactions', body)
}
