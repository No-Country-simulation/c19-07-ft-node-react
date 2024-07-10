// src/modules/students/student.routes.ts
import { Router } from 'express'
import * as studentController from './students.controllers'

const studentRoutes = Router()

studentRoutes.get('/', studentController.getAllStudents)
studentRoutes.post('/', studentController.createStudent)
studentRoutes.get('/:id', studentController.getStudentById)
studentRoutes.put('/:id', studentController.updateStudent)
studentRoutes.delete('/:id', studentController.deleteStudent)

export default studentRoutes
