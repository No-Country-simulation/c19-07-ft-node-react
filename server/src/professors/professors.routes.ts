/* eslint-disable @typescript-eslint/no-misused-promises */
// src/modules/professors/professor.routes.ts
import { Router } from 'express'
import { ROLES } from '../constants/roles.const'
import { checkRole } from '../middlewares/checkRole.mdl'
import * as professorController from './professors.controllers'
import { ProfessorController } from './managemetProfessor/controllers/professor.ctl'
const professorCtl = new ProfessorController()
const professorRoutes = Router()

// professorRoutes.get('/', checkRole([ROLES.ADMIN, ROLES.PROFESSOR, ROLES.PARENTS]), professorController.getAllProfessors)
professorRoutes.get('/details', professorController.getAllStudentsWithDetailsController) // se agrego esta ruta
professorRoutes.get('/get-evaluations-by-periodo', professorCtl.getEvaluationsByPeriodoOfStudent)
professorRoutes.get('/', professorController.getAllProfessors)
professorRoutes.post('/', professorController.createProfessor)
professorRoutes.get('/:id', professorController.getProfessorById)
professorRoutes.patch('/:id', professorController.updateProfessor)
professorRoutes.delete('/:id', professorController.deleteProfessor)

// Evaluations Routes
professorRoutes.post('/create-evaluation', professorCtl.createEvaluation)
professorRoutes.post('/create-evaluation-result', professorCtl.createEvaluationResult)
professorRoutes.post('/evaluations', professorController.createEvaluations)
professorRoutes.get('/evaluations/:id', professorController.getAcademicRecordsByCourseId)
professorRoutes.get('/evaluation_results/:id', professorController.getResultsFromOneAcademicRecord)
professorRoutes.patch('/evaluations/:id', professorController.updateAcademicRecordById)
// Assigned Students
professorRoutes.get('/assigned_students/:id', professorController.getAssignedStudents)

export default professorRoutes
