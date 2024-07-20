/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import http from 'http'
import { Server as SocketServer, Socket } from 'socket.io'
import { ChatServices } from '../chat/chat.services'

const chatServices = new ChatServices()

export class ServerSocket {
  private readonly server: http.Server
  private readonly io: SocketServer
  private readonly userSockets = new Map<string, string>() // Mapa para almacenar sockets de usuario

  constructor (server: http.Server) {
    this.server = server
    this.io = new SocketServer(this.server, {
      cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
      }
    })

    this.initializeSocket()
  }

  private initializeSocket (): void {
    this.io.on('connection', (socket: Socket) => {
      console.log('A user connected:', socket.id)

      // Registrar el socket del usuario
      socket.on('register', (userId: string) => {
        this.userSockets.set(userId, socket.id)
        console.log(`User ${userId} registered with socket ID: ${socket.id}`)
      })

      // Enviar un mensaje
      socket.on('sendMessage', async (data) => {
        const { userSendID, userReceiveId, message } = data

        console.log(`Sending message from ${userSendID} to ${userReceiveId}:`, message)

        try {
          const newMessage = await chatServices.createMessage(userSendID, userReceiveId, message)

          const receiverSocketId = this.userSockets.get(userReceiveId)
          const senderSocketId = this.userSockets.get(userSendID)

          if (receiverSocketId) {
            console.log(`Emitting to receiver ${receiverSocketId}`)
            socket.to(receiverSocketId).emit('receiveMessage', newMessage)
          } else {
            console.log(`No socket found for receiver ${userReceiveId}`)
          }

          if (senderSocketId) {
            console.log(`Emitting to sender ${senderSocketId}`)
            socket.to(senderSocketId).emit('receiveMessage', newMessage)
          } else {
            console.log(`No socket found for sender ${userSendID}`)
          }
        } catch (err) {
          console.error('Error saving message:', err)
        }
      })

      // Manejar la desconexión
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
        this.userSockets.forEach((value, key) => {
          if (value === socket.id) {
            this.userSockets.delete(key)
          }
        })
      })
    })
  }

  public start (port: number): void {
    this.server.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }
}
