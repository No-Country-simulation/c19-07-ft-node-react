// import express, { Request, Response, NextFunction, Application } from "express";
// import path from "path";
// import dotenv from "dotenv";
// import cors from "cors";
// import morgan from "morgan";
// import cookieParser from "cookie-parser";
// // import http from "http";
// import { Server as SocketServer } from "socket.io";
// import { PrismaClient } from "@prisma/client";
// import http, { Server as HTTPServer } from 'http';
// // const app = express();
// // const server = http.createServer(app);
// // export const io = new SocketServer(server, {
// //   cors: {
// //     origin: "http://localhost:5173",
// //     credentials: true,
// //   },
// // });

// // io.on("connection", (socket) => {
// //     console.log("a user connected", socket.id);
// //     socket.on("disconnect", () => {
// //       console.log("user disconnected");
// //     });
// // });

// class ChatGateway {
//    constructor(
//     private readonly app: Application,	
//     private readonly http: HTTPServer,

//    ) {
//    }

//    config(): void {
//     this.app.set("port", process.env.PORT_WS || 81);
//     this.app.use(cors({
//       origin: 'http://localhost:5173',
//       credentials: true
//     }));
//   }

// //   start(): void {
// //     this.http.listen(this.app.get('port'), () => {
// //       console.log(`Server on port ${this.app.get('port')}`);
// //     });
// //   }

// }
// export default ChatGateway;

//parte 1
// import http, { Server as HTTPServer } from 'http';
// import { Server as SocketServer, Socket } from 'socket.io';
// import express, { Application } from 'express';

// // Clase Server que recibe el servidor HTTP y la aplicación Express como dependencias
// export class ServerSocket {
//   private server: HTTPServer;
//   private io: SocketServer;

//   constructor(server: HTTPServer, app: Application) {
//     this.server = server;
//     this.io = new SocketServer(this.server, {
//       cors: {
//         origin: "http://localhost:8082",
//         credentials: true,
//       },
//     });

//     this.initializeSocket();
//   }

//   private initializeSocket(): void {
//     this.io.on("connection", (socket: Socket) => {
//       console.log("a user connected", socket.id);

//       socket.on("disconnect", () => {
//         console.log("user disconnected");
//       });
//     });
//   }

//   public start(port: number): void {
//     this.server.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   }
// }

//---------------Para borrar
// Crear la aplicación Express y el servidor HTTP
//  const app: Application = express();
// const server: HTTPServer = http.createServer(app);

// Inicializar y arrancar el servidor pasando las dependencias
// const myServer = new Server(server, app);
// myServer.start(3000);
//---------------Para borrar

//parte dos
import http from 'http'
import express, { Application } from 'express'
import { Server as SocketServer, Socket } from 'socket.io'
import { PrismaClient } from '@prisma/client'
import { ChatServices } from '../chat/chat.services'

const prisma = new PrismaClient()
const chatServices = new ChatServices()

export class ServerSocket {
  private server: http.Server
  private io: SocketServer

  constructor(server: http.Server, app: Application) {
    this.server = server
    this.io = new SocketServer(this.server, {
      cors: {
        origin: 'http://localhost:5173',
        credentials: true,
        methods: ['GET', 'POST']
      }
    })

    this.initializeSocket()
  }

  private initializeSocket(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log('a user connected:', socket.id)

      socket.on('sendMessage', async (data) => {
        const { userSendID, userReceiveId, message,roomId } = data

        try {
          const newMessage = await chatServices.createMessage(userSendID, userReceiveId, message)
          this.io.to(roomId).emit('receiveMessage', newMessage)
        } catch (err) {
          console.error('Error saving message:', err)
        }
      })

      socket.on('disconnect', () => {
        console.log('user disconnected:', socket.id)
      })
    })
  }

  public start(port: number): void {
    this.server.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }
}
