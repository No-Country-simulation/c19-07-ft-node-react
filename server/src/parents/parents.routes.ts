/* eslint-disable @typescript-eslint/no-misused-promises */
// src/modules/professors/professor.routes.ts
import { Router } from 'express'
import * as parentController from './parents.controllers'

const parentRoutes = Router()

parentRoutes.get('/', parentController.getAllParents)
parentRoutes.get('/details', parentController.getStudentsWithDetailsController)
parentRoutes.get('/details/:id', parentController.getStudentByIdController)
parentRoutes.post('/', parentController.createParents)
parentRoutes.get('/:id', parentController.getParentsById)
parentRoutes.put('/:id', parentController.updateParents)
parentRoutes.delete('/:id', parentController.deleteParents)

export default parentRoutes
