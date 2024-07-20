/* eslint-disable @typescript-eslint/no-misused-promises */
// src/modules/professors/professor.routes.ts
import { Router } from 'express'
import { ROLES } from '../constants/roles.const'
import { checkRole } from '../middlewares/checkRole.mdl'
import * as professorController from './professors.controllers'

const professorRoutes = Router()

professorRoutes.get('/', checkRole([ROLES.ADMIN, ROLES.PROFESSOR, ROLES.PARENTS]), professorController.getAllProfessors)
professorRoutes.post('/', professorController.createProfessor)
professorRoutes.get('/:id', professorController.getProfessorById)
professorRoutes.patch('/:id', professorController.updateProfessor)
professorRoutes.delete('/:id', professorController.deleteProfessor)
professorRoutes.post('/evaluations/:id', professorController.createEvaluations)

export default professorRoutes
