// import express, { Request, Response, Application, NextFunction } from 'express'
// import cors from 'cors'
// import morgan from 'morgan'
// import router from './routes/index'
// import { ResponseHandler } from './libs/response.lib'
// import studentRoutes from './students/students.routes'
// import professorRoutes from './professors/professors.routes'
// import parentRoutes from './parents/parents.routes'
// import authRoutes from './auth/auth.routes'
// import cookieParser from 'cookie-parser'
// import usersRoutes from './users/users.routes'
// import swaggerUi from 'swagger-ui-express'
// import swaggerFile from '../openapi.json'
// import { ServerSocket } from "../../server/src/configs/chat.gateway"
// import http, { Server as HTTPServer } from 'http';

// class Server {
//   private readonly app: Application

//   constructor() {
//     this.app = express()
//     this.config()
//     this.routes()
//     this.errorHandling()
//     // this.initializeSocket()
//   }

//   config(): void {
//     this.app.set('port', process.env.PORT_SERVER !== undefined ? process.env.PORT_SERVER : 3000)
//     this.app.use(morgan('dev'))
//     this.app.use(express.json())
//     this.app.use(cookieParser())
//     this.app.use(cors({
//       origin: '*',
//       credentials: true
//     }))

//   }

//   routes(): void {
//     this.app.use('/api/v1', router)
//     this.app.use('/api/users', usersRoutes)
//     this.app.use('/api/students', studentRoutes)
//     this.app.use('/api/professors', professorRoutes)
//     this.app.use('/api/parents', parentRoutes)
//     this.app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
//     this.app.use('/api/v1/auth', authRoutes)
//   }

//   errorHandling(): void {
//     // Manejo de errores
//     this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//       const responseHandler = new ResponseHandler(res)
//       const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500
//       const message = typeof err.message === 'string' ? err.message : 'Internal Server Error'
//       const errors = err.errors !== undefined && err.errors !== null ? err.errors : {}

//       responseHandler.sendError(statusCode, message, errors)
//     })
//   }


//   initializeSocket(): void {
//     const server: HTTPServer = http.createServer(this.app);
//     const newchatGateway = new ServerSocket(
//       server, this.app
//     )
//   }
//   start(): void {
//     // this.app.listen(this.app.get('port'), () => {
//     //   console.log('Server on port', this.app.get('port'))
//     // })

//     const server: HTTPServer = http.createServer(this.app);
//     const newchatGateway = new ServerSocket(
//       server, this.app
//     )
//     server.listen(this.app.get('port'), () => {
//       console.log('Server on port', this.app.get('port'))
//     })
//   }
// }
// export default Server


// //Parte 2:
// import express, { Request, Response, Application, NextFunction } from 'express'
// import cors from 'cors'
// import morgan from 'morgan'
// import router from './routes/index'
// import { ResponseHandler } from './libs/response.lib'
// import studentRoutes from './students/students.routes'
// import professorRoutes from './professors/professors.routes'
// import parentRoutes from './parents/parents.routes'
// import authRoutes from './auth/auth.routes'
// import cookieParser from 'cookie-parser'
// import usersRoutes from './users/users.routes'
// import swaggerUi from 'swagger-ui-express'
// import swaggerFile from '../openapi.json'
// import http from 'http'
// import { Server as SocketIOServer } from 'socket.io'
// class Server {
//   private readonly app: Application
//   private readonly server: http.Server
//   private readonly io: SocketIOServer
//   constructor () {
//     this.app = express()
//     this.server = http.createServer(this.app)
//     this.io = new SocketIOServer(this.server, {
//       cors: {
//         origin: 'http://localhost:5173',
//         credentials: true
//       }
//     })
//     this.sockets()
//     this.config()
//     this.routes()
//     this.errorHandling()
//   }

//   config (): void {
//     this.app.set('port', process.env.PORT_SERVER !== undefined ? process.env.PORT_SERVER : 3000)
//     this.app.use(morgan('dev'))
//     this.app.use(express.json())
//     this.app.use(cookieParser())
//     this.app.use(cors({
//       origin: 'http://localhost:5173',
//       credentials: true
//     }))
//   }

//   routes (): void {
//     this.app.use('/api/v1', router)
//     this.app.use('/api/users', usersRoutes)
//     this.app.use('/api/students', studentRoutes)
//     this.app.use('/api/professors', professorRoutes)
//     this.app.use('/api/parents', parentRoutes)
//     this.app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
//     this.app.use('/api/v1/auth', authRoutes)
//   }

//   sockets (): void {
//     this.io.on('connection', (socket) => {
//       console.log('a user connected:', socket.id)

//       /* socket.on('disconnect', () => {
//         console.log('user disconnected:', socket.id)
//       }) */
//     })

//     this.io.emit('message', 'Hello World')
//   }

//   errorHandling (): void {
//     // Manejo de errores
//     this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//       const responseHandler = new ResponseHandler(res)
//       const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500
//       const message = typeof err.message === 'string' ? err.message : 'Internal Server Error'
//       const errors = err.errors !== undefined && err.errors !== null ? err.errors : {}

//       responseHandler.sendError(statusCode, message, errors)
//     })
//   }

//   start (): void {
//     this.server.listen(this.app.get('port'), () => {
//       console.log('Server on port', this.app.get('port'))
//     })
//   }
// }
// export default Server


//parte 3
//import express, { Application } from 'express'
import express, { Request, Response, Application, NextFunction } from 'express'

import cors from 'cors'
import morgan from 'morgan'
import router from './routes/index'
import studentRoutes from './students/students.routes'
import professorRoutes from './professors/professors.routes'
import parentRoutes from './parents/parents.routes'
import authRoutes from './auth/auth.routes'
import cookieParser from 'cookie-parser'
import usersRoutes from './users/users.routes'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from '../openapi.json'
import http from 'http'
import chatRoutes from './chat/chat.routes'
import { ServerSocket } from './configs/chat.gateway'

class Server {
  private readonly app: Application
  private readonly server: http.Server
  private readonly socketServer: ServerSocket

  constructor() {
    this.app = express()
    this.server = http.createServer(this.app)
    this.socketServer = new ServerSocket(this.server, this.app)
    this.config()
    this.routes()
    this.errorHandling()
  }

  config(): void {
    this.app.set('port', process.env.PORT_SERVER || 3000) 
    // this.app.set('port', 3001|| 3000)  
    this.app.use(morgan('dev'))
    this.app.use(express.json())
    this.app.use(cookieParser())
    this.app.use(cors({
      origin: 'http://localhost:5173',
      credentials: true
    }))
  }

  routes(): void {
    this.app.use('/api/v1', router)
    this.app.use('/api/users', usersRoutes)
    this.app.use('/api/students', studentRoutes)
    this.app.use('/api/professors', professorRoutes)
    this.app.use('/api/parents', parentRoutes)
    this.app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
    this.app.use('/api/v1/auth', authRoutes)
    this.app.use('/api/chat', chatRoutes)
  }

  errorHandling(): void {
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const statusCode = typeof err.statusCode === 'number' ? err.statusCode : 500
      const message = typeof err.message === 'string' ? err.message : 'Internal Server Error'
      res.status(statusCode).json({ message })
    })
  }

  start(): void {
    this.server.listen(this.app.get('port'), () => {
      console.log('Server on port', this.app.get('port'))
    })
  }
}

export default Server
