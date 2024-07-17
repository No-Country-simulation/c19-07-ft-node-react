import express, { Request, Response, Application, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes/index'
import { ResponseHandler } from './libs/response.lib'
import studentRoutes from './students/students.routes'
import professorRoutes from './professors/professors.routes'
import parentRoutes from './parents/parents.routes'
import authRoutes from './auth/auth.routes'
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

  config (): void {
    this.app.set('port', process.env.PORT_SERVER !== undefined ? process.env.PORT_SERVER : 3000)
    console.log(process.env.PORT_SERVER)
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(cors({
      origin: '*',
      credentials: true
    }))
  }

  routes (): void {
    this.app.use('/api/v1', router)
    this.app.use('/api/users', usersRoutes)
    this.app.use('/api/students', studentRoutes)
    this.app.use('/api/professors', professorRoutes)
    this.app.use('/api/parents', parentRoutes)
    this.app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    this.app.use('/api/v1/auth', authRoutes)
  }

  errorHandling (): void {
    // Manejo de errores
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const responseHandler = new ResponseHandler(res)
      const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500
      const message = typeof err.message === 'string' ? err.message : 'Internal Server Error'
      const errors = err.errors !== undefined && err.errors !== null ? err.errors : {}

      responseHandler.sendError(statusCode, message, errors)
    })
  }

  start (): void {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'))
    })
  }
}
export default Server
