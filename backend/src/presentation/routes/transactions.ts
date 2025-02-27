import { Router, Request, Response } from 'express'
import { CreateTransationsController } from '../controllers/CreateTransations'
import { GetTransationsController } from '../controllers/GetTransations'
import { http } from '../protocols/http'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const routes = Router()

routes.route('/transactions')
  .get(async (req: Request, res: Response) => {
    const getTransations = new GetTransationsController()
    const response = await getTransations.handle(req.query) as http
    res.status(response.statusCode).send(response.body)
  })
  .post(upload.single('file'), async (req: Request, res: Response) => {
    const createTransations = new CreateTransationsController()
    const response = await createTransations.handle(req.file!.buffer) as http
    res.status(response.statusCode).send(response.body)
  })

export {
  routes
}
