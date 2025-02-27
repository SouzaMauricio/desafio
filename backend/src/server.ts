import express from 'express'
import cors from 'cors'
import { routes } from './presentation/routes'

const app = express()

app.use(cors())
app.use(routes)
app.use(express.json())

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}/`)
})
