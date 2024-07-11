import express, { Request, Response, Application, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes/index'
import studentRoutes from './students/students.routes'
import professorRoutes from './professors/professors.routes'
import parentRoutes from './parents/parents.routes'
class Server {
  private readonly app: Application
  constructor () {
    this.app = express()
    this.config()
    this.routes()
  }

  config () {
    this.app.set('port', (process.env.PORT_SERVER != null) || 3000)
    this.app.use(morgan('dev'))
    this.app.use(cors())
    this.app.use(express.json())
  }

  routes () {
    this.app.use('/api/v1', router)
    this.app.use('/api/students', studentRoutes)
    this.app.use('/api/professors', professorRoutes)
    this.app.use('/api/parents', parentRoutes)
  }

  start () {
    this.app.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'))
    })
  }
}
export default Server
