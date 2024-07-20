import { Request, Response } from 'express'
import { ChatServices } from './chat.services'
import { Messages } from '@prisma/client'

const chatServices = new ChatServices()

export const createRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userSendID, userReceiveId } = req.body
    const roomId = await chatServices.createRoom(userSendID, userReceiveId)
    res.status(201).json({ roomId })
  } catch (err) {
    res.status(500).send('Server Error')
  }
}

export const getMessagesByRoomId = async (req: Request, res: Response): Promise<void> => {
  try {
    // const { id } = req.params; // El ID del roomId
    const { id: roomId } = req.params // El ID del roomId
    const messages = await chatServices.getMessagesByRoomId(roomId)
    res.status(201).json(messages)
  } catch (err: any) {
    // res.status(500).send('Server Error');
    console.error('Error getting messages:', err)
    res.status(500).json({ message: 'Server Error', error: err.message })
  }
}

export const createChatControllers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userSendID, userReceiveId, message } = req.body
    const { id: roomId } = req.params // Obtener el roomId desde los parámetros
    const newMessage = await chatServices.createMessage(message, userSendID, userReceiveId, roomId)
    // const newMessage: Messages = await chatServices.createMessage(userSendID, userReceiveId, message)
    res.status(201).json(newMessage)
  } catch (err: any) {
    // res.status(500).send('Server Error')
    console.error('Error creating message:', err)
    res.status(500).json({ message: 'Server Error', error: err.message })
  }
}
