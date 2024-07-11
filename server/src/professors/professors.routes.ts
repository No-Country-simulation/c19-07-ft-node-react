// src/modules/professors/professor.routes.ts
import { Router } from 'express'
import * as professorController from './professors.controllers'
import {getProfessorByIdController} from './professors.controllers'
const professorRoutes = Router()

professorRoutes.get('/', professorController.getAllProfessors)
professorRoutes.post('/', professorController.createProfessor)
professorRoutes.get('/:id', getProfessorByIdController)
professorRoutes.put('/:id', professorController.updateProfessor)
professorRoutes.delete('/:id', professorController.deleteProfessor)

export default professorRoutes
