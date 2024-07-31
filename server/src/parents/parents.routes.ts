/* eslint-disable @typescript-eslint/no-misused-promises */
// src/modules/professors/professor.routes.ts
import { Router } from 'express'
import * as parentController from './parents.controllers'

const parentRoutes = Router()

// Rutas más específicas primero
parentRoutes.get('/details/:id', parentController.getStudentByIdController)
parentRoutes.get('/details', parentController.getStudentsWithDetailsController)
parentRoutes.get('/students-Witch-Courses/:id', parentController.getStudent)
parentRoutes.get('/info', parentController.getStudentParentDetailsControllers)

// Rutas menos específicas después
parentRoutes.get('/:id', parentController.getParentsById)
parentRoutes.put('/:id', parentController.updateParents)
parentRoutes.delete('/:id', parentController.deleteParents)
parentRoutes.get('/', parentController.getAllParents)
parentRoutes.post('/', parentController.createParents)

export default parentRoutes
