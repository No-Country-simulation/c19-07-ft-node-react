/* eslint-disable @typescript-eslint/no-misused-promises */
// src/modules/professors/professor.routes.ts
import { Router } from 'express'
import { ROLES } from '../constants/roles.const'
import { checkRole } from '../middlewares/checkRole.mdl'
import * as professorController from './professors.controllers'

const professorRoutes = Router()

// professorRoutes.get('/', checkRole([ROLES.ADMIN, ROLES.PROFESSOR, ROLES.PARENTS]), professorController.getAllProfessors)
professorRoutes.get('/', professorController.getAllProfessors)
professorRoutes.post('/', professorController.createProfessor)
professorRoutes.get('/:id', professorController.getProfessorById)
professorRoutes.patch('/:id', professorController.updateProfessor)
professorRoutes.delete('/:id', professorController.deleteProfessor)
// Evaluations Routes
professorRoutes.post('/evaluations/:id', professorController.createEvaluations)
professorRoutes.get('/evaluations/:id', professorController.getEvaluationsByCourse)
professorRoutes.get('/evaluation_results/:id', professorController.getResultsFromOneEvaluation)
// Assigned Students
professorRoutes.get('/assigned_students/:id', professorController.getAssignedStudents)
export default professorRoutes
