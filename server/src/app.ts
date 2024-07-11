import express, { Request, Response, Application, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes/index'
import { ResponseHandler } from './libs/response.lib'
import studentRoutes from './students/students.routes'
import professorRoutes from './professors/professors.routes'
import parentRoutes from './parents/parents.routes'
import authRoutes from './auth/routes/auth.route'
class Server {
  private readonly app: Application

  constructor () {
    this.app = express()
    this.config()
    this.routes()
    this.errorHandling()
  }

  config () {
    this.app.set('port', process.env.PORT_SERVER || 3000)
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.app.use(express.json())
  }

  routes () {
    this.app.use('/api/v1', router)
    this.app.use('/api/students', studentRoutes)
    this.app.use('/api/professors', professorRoutes)
    this.app.use('/api/parents', parentRoutes)
    this.app.use('/api/v1/auth', authRoutes)
  }

  errorHandling () {
    // Manejo de errores
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const responseHandler = new ResponseHandler(res)
      responseHandler.sendError(500, err.message || 'Internal Server Error')
    })
  }

  start () {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'))
    })
  }
}
export default Server
