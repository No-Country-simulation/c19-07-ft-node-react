// src/modules/students/controllers/student.controller.ts
import { Request, Response } from 'express'
import * as studentService from '../students/students.services'

export const getAllStudents = async (req: Request, res: Response): Promise<void> => {
  try {
    const students = await studentService.getAllStudents()
    res.json(students)
  } catch (err) {
    res.status(500).send('Server Error')
  }
}

export const createStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { grade, section, state, parentId, educational_level_id } = req.body
    const student = await studentService.createStudent({ grade, section, state, parentId, createdAt: new Date(), updatedAt: new Date(), educational_level_id })
    res.json(student)
  } catch (err) {
    res.status(500).send('Server Error')
  }
}

export const getStudentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await studentService.getStudentById(String(req.params.id))
    if (student != null) {
      res.json(student)
    } else {
      res.status(404).send('Student not found')
    }
  } catch (err) {
    res.status(500).send('Server Error')
  }
}

export const updateStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    const student = await studentService.updateStudent(String(req.params.id), req.body)
    res.json(student)
  } catch (err) {
    res.status(500).send('Server Error')
  }
}

export const deleteStudent = async (req: Request, res: Response): Promise<void> => {
  try {
    await studentService.deleteStudent(String(req.params.id))
    res.status(204).send()
  } catch (err) {
    res.status(500).send('Server Error')
  }
}
