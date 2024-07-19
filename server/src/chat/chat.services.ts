import { PrismaClient, Messages } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient()

export class ChatServices {
  constructor() {}

  async createRoom(userSendID: string, userReceiveId: string) {
    const existingMessage = await prisma.messages.findFirst({
      where: {
        OR: [
          {
            userSendID: userSendID,
            userReceiveId: userReceiveId,
          },
          {
            userSendID: userReceiveId,
            userReceiveId: userSendID,
          },
        ],
      },
    });
    const roomId = existingMessage ? existingMessage.roomId : uuidv4();

    // Crear un mensaje inicial o cualquier otra lógica para crear la sala
    if (!existingMessage) {
      await prisma.messages.create({
        data: {
          message: 'Room created',
          userSendID,
          userReceiveId,
          roomId,
        },
      });
    }

    return roomId;
  }

  async createMessage(userSendID: string, userReceiveId: string, message: string, roomId?: string) {
    // const generatedRoomId = roomId || uuidv4();

    // const existingMessage = await prisma.messages.findFirst({
    //     where: {
    //       OR: [
    //         {
    //           userSendID: userSendID,
    //           userReceiveId: userReceiveId,
    //         },
    //         {
    //           userSendID: userReceiveId,
    //           userReceiveId: userSendID,
    //         },
    //       ],
    //     },
    //   });

    // const roomId = existingMessage ? existingMessage.roomId : uuidv4();

    // Si no hay roomId, buscar uno existente o crear uno nuevo
    // if (!roomId) {
    //   const existingMessage = await prisma.messages.findFirst({
    //     where: {
    //       OR: [
    //         {
    //           userSendID: userSendID,
    //           userReceiveId: userReceiveId,
    //         },
    //         {
    //           userSendID: userReceiveId,
    //           userReceiveId: userSendID,
    //         },
    //       ],
    //     },
    //   });
    //   roomId = existingMessage ? existingMessage.roomId : uuidv4();
    // }

    if (!roomId) {
      roomId = await this.createRoom(userSendID, userReceiveId);
    }

    // Crear un nuevo mensaje con el roomId encontrado o uno nuevo
    const newMessage = await prisma.messages.create({
      data: {
        message,
        userSendID,
        userReceiveId,
        roomId,
      },
    })

    console.log(newMessage)

    return newMessage;
  }

  async getMessagesByRoomId(roomId: string) {
    return await prisma.messages.findMany({
      where: {
        roomId,
      },
      orderBy: {
        createdAt: 'asc', // Ordenar por fecha de creación en orden ascendente
      },
    });
  }
}
