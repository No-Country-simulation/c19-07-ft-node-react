import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Application, NextFunction, Request, Response } from 'express'
import http from 'http'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../openapi.json'
import { ServerSocket } from './configs/chat.gateway'
import alertRoutes from './alerts/alerts.routes'

import router from './routes/index'
import authRoutes from './auth/auth.routes'
import { verifyToken } from './middlewares/verifyAccesToken.mdl'
class Server {
  private readonly app: Application
  private readonly server: http.Server
  private readonly socketServer: ServerSocket

  constructor () {
    this.app = express()
    this.server = http.createServer(this.app)
    this.socketServer = new ServerSocket(this.server)
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
      origin: process.env.CORS_ORIGIN_URL,
      credentials: true
    }))
  }

  routes (): void {
    this.app.use('/api/v1/auth', authRoutes)
    this.app.use('/api/v1', verifyToken, router)
    this.app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
  }

  errorHandling (): void {
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500
      const message = typeof err.message === 'string' ? err.message : 'Internal Server Error'
      console.log(err)
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
