// src/modules/professors/professor.routes.ts
import { Router } from 'express'
import * as professorController from './professors.controllers'

const professorRoutes = Router()

professorRoutes.get('/', professorController.getAllProfessors)
professorRoutes.post('/', professorController.createProfessor)
professorRoutes.get('/:id', professorController.getProfessorById)
professorRoutes.put('/:id', professorController.updateProfessor)
professorRoutes.delete('/:id', professorController.deleteProfessor)

export default professorRoutes
