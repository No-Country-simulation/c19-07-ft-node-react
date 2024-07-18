/* eslint-disable @typescript-eslint/no-misused-promises */
// src/modules/professors/professor.routes.ts
import { Router } from 'express'
import * as professorController from './professors.controllers'
import { verifyToken } from '../middlewares/verifyAccesToken.mdl'
import { checkRole } from '../middlewares/checkRole.mdl'
import { ROLES } from '../constants/roles.const'

const professorRoutes = Router()

professorRoutes.get('/', verifyToken, checkRole([ROLES.ADMIN, ROLES.PROFESSOR]), professorController.getAllProfessors)
professorRoutes.post('/', professorController.createProfessor)
professorRoutes.get('/:id', professorController.getProfessorById)
professorRoutes.patch('/:id', professorController.updateProfessor)
professorRoutes.delete('/:id', professorController.deleteProfessor)
professorRoutes.post('/evaluations/:id', professorController.createEvaluations)

export default professorRoutes
