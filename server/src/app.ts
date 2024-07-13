import express, { Request, Response, Application, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes/index'
import { ResponseHandler } from './libs/response.lib'
import studentRoutes from './students/students.routes'
import professorRoutes from './professors/professors.routes'
import parentRoutes from './parents/parents.routes'
import authRoutes from './auth/auth.route'
import cookieParser from 'cookie-parser'
import usersRoutes from './users/users.routes'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../openapi.json'

class Server {
  private readonly app: Application

  constructor () {
    this.app = express()
    this.config()
    this.routes()
    this.errorHandling()
  }

  config () {
    this.app.set('port', process.env.PORT_SERVER !== undefined ? process.env.PORT_SERVER : 3000)
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(cors({
      origin: '*',
      credentials: true
    }))
  }

  routes () {
    this.app.use('/api/v1', router)
    this.app.use('/api/users', usersRoutes)
    this.app.use('/api/students', studentRoutes)
    this.app.use('/api/professors', professorRoutes)
    this.app.use('/api/parents', parentRoutes)
    this.app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    this.app.use('/api/v1/auth', authRoutes)
  }

  errorHandling () {
    // Manejo de errores
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const responseHandler = new ResponseHandler(res)
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      responseHandler.sendError(err.statusCode || 500, err.message || 'Internal Server Error', err.errors || {})
    })
  }

  start () {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'))
    })
  }
}
export default Server
