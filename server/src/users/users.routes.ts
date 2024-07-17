/* eslint-disable @typescript-eslint/no-misused-promises */
// src/modules/students/student.routes.ts
import { Router } from 'express'
import * as userschanges from './users.controllers'
import { verifyToken } from '../middlewares/verifyAccesToken.mdl'

const usersRoutes = Router()
usersRoutes.get('/get-profile', verifyToken, userschanges.getProfileControllers)
usersRoutes.get('/', userschanges.getAllUsersControllers)
usersRoutes.post('/', userschanges.createUsersControllers)
usersRoutes.get('/:id', userschanges.getUsersByIdControllers)
usersRoutes.put('/:id', userschanges.updateUsersControllers)
usersRoutes.delete('/:id', userschanges.deleteUsersControllers)

export default usersRoutes
