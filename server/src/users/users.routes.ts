/* eslint-disable @typescript-eslint/no-misused-promises */
// src/modules/students/student.routes.ts
import { Router } from 'express'
import * as userschanges from './users.controllers'

const usersRoutes = Router()
usersRoutes.get('/get-profile', userschanges.getProfileControllers)
usersRoutes.get('/', userschanges.getAllUsersControllers)
usersRoutes.post('/', userschanges.createUsersControllers)
usersRoutes.get('/:id', userschanges.getUsersByIdControllers)
usersRoutes.put('/:id', userschanges.updateUsersControllers)
usersRoutes.delete('/:id', userschanges.deleteUsersControllers)

export default usersRoutes
