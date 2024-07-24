import http from 'http'
import { Server as SocketServer, Socket } from 'socket.io'
import { ChatServices } from '../chat/chat.services'

const chatServices = new ChatServices()
const activeSockets = new Map<string, string>()

export class ServerSocket {
  private readonly server: http.Server
  private readonly io: SocketServer

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

      socket.on('register', async (data: { userId: string, userReceiveId?: string }) => {
        const { userId, userReceiveId } = data

        if (!userId) {
          console.error('No userId provided')
          return
        }

        activeSockets.set(userId, socket.id)
        console.log(`User ${userId} registered with socket ID: ${socket.id}`)

        if (userReceiveId) {
          try {
            const messages = await chatServices.getMessagesBetweenUsers(userId, userReceiveId)
            socket.emit('messageHistory', messages)
          } catch (err) {
            console.error('Error fetching message history:', err)
          }
        }
      })

      socket.on('sendMessage', async (data) => {
        const { userSendID, userReceiveId, message } = data

        if (!userSendID || !userReceiveId || !message) {
          console.error('Missing data for sendMessage:', data)
          return
        }

        console.log(`Sending message from ${userSendID} to ${userReceiveId}:`, message)

        try {
          // Create or get room ID
          const roomId = await chatServices.createRoom(userSendID, userReceiveId)

          // Save the message with room ID
          const newMessage = await chatServices.createMessage(userSendID, userReceiveId, message, roomId)

          const receiverSocketId = activeSockets.get(userReceiveId)

          if (receiverSocketId) {
            console.log(`Emitting to receiver ${receiverSocketId}`)
            this.io.to(receiverSocketId).emit('receiveMessage', newMessage)
          } else {
            console.log(`No socket found for receiver ${userReceiveId}`)
          }
        } catch (err) {
          console.error('Error saving message:', err)
        }
      })

      socket.on('disconnect', () => {
        for (const [userId, socketId] of activeSockets.entries()) {
          if (socketId === socket.id) {
            activeSockets.delete(userId)
            console.log('User disconnected:', userId)
            break
          }
        }
      })
    })
  }

  public start (port: number): void {
    this.server.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  }
}
