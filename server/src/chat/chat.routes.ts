// src/modules/students/student.routes.ts
import { Router } from 'express'
import * as chatController from './chat.controllers'

const chatRoutes = Router()

// chatRoutes.get('/', chatController.getAllStudents)
chatRoutes.post('/rooms', chatController.createRoom) // Nueva ruta para crear una sala
chatRoutes.get('/rooms/:id/messages', chatController.getMessagesByRoomId) // Ruta para obtener mensajes por ID de sala
chatRoutes.post('/rooms/:id/messages', chatController.createChatControllers) // Ruta para crear un mensaje
chatRoutes.get('/:userSendID/:userReceiveId', chatController.getMessageHistory)

export default chatRoutes
