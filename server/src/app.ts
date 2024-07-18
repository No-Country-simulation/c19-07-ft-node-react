import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import http from 'http'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../openapi.json'
import chatRoutes from './chat/chat.routes'
import { ServerSocket } from './configs/chat.gateway'
import parentRoutes from './parents/parents.routes'
import professorRoutes from './professors/professors.routes'
import router from './routes/index'
import studentRoutes from './students/students.routes'
import usersRoutes from './users/users.routes'

class Server {
  private readonly app: Application
  private readonly server: http.Server
  private readonly socketServer: ServerSocket

  constructor () {
    this.app = express()
    this.server = http.createServer(this.app)
    this.socketServer = new ServerSocket(this.server, this.app)
    this.config()
    this.routes()
    this.errorHandling()
  }

  config (): void {
    this.app.set('port', process.env.PORT_SERVER !== undefined ? process.env.PORT_SERVER : 3000)
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(cors({
      origin: 'http://localhost:5173',
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
    this.app.use('/api/chat', chatRoutes)
  }

  errorHandling (): void {
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500
      const message = typeof err.message === 'string' ? err.message : 'Internal Server Error'
      res.status(statusCode).json({ message })
    })
  }

  start (): void {
    this.server.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'))
    })
  }
}

export default Server
