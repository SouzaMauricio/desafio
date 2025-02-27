
import mongoose, { Mongoose } from 'mongoose'

export class Connection {
  async createConnection (): Promise<Mongoose> {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI!, { maxPoolSize: 10, readPreference: 'secondaryPreferred' })
      console.log('Connected to mongo')
      return conn
    } catch (error: any) {
      console.error('Error to load connection: ', error)
      throw error
    }
  }
}
