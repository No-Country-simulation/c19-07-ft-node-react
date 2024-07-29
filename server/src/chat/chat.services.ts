import { PrismaClient, Messages } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

const prisma = new PrismaClient()

export class ChatServices {
  constructor () {}

  async getMessagesBetweenUsers (userSendID: string, userReceiveId: string) {
    return await prisma.messages.findMany({
      where: {
        OR: [
          { userSendID, userReceiveId },
          { userSendID: userReceiveId, userReceiveId: userSendID }
        ]
      },
      orderBy: { createdAt: 'asc' }
    })
  }

  async createRoom (userSendID: string, userReceiveId: string) {
    const existingMessage = await prisma.messages.findFirst({
      where: {
        OR: [
          { userSendID, userReceiveId },
          { userSendID: userReceiveId, userReceiveId: userSendID }
        ]
      }
    })
    const roomId = (existingMessage != null) ? existingMessage.roomId : uuidv4()

    // Crear un mensaje inicial o cualquier otra lógica para crear la sala
    if (existingMessage == null) {
      await prisma.messages.create({
        data: {
          message: 'Room created',
          userSendID,
          userReceiveId,
          roomId
        }
      })
    }

    return roomId
  }

  async createMessage (userSendID: string, userReceiveId: string, message: string, roomId?: string) {
    console.log('createMessage', userSendID, userReceiveId, message, roomId)

    const newMessage = await prisma.messages.create({
      data: {
        message,
        userSendID,
        userReceiveId,
        roomId
      }
    })

    console.log(newMessage)

    return newMessage
  }

  async getMessagesByRoomId (roomId: string) {
    return await prisma.messages.findMany({
      where: {
        roomId
      },
      orderBy: {
        createdAt: 'asc' // Ordenar por fecha de creación en orden ascendente
      }
    })
  }
}
