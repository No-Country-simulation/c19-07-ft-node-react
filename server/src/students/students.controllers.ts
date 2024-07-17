// src/modules/students/controllers/student.controller.ts
import { Request, Response } from 'express'
import * as studentService from '../students/students.services'
import { Academic_records } from '@prisma/client'

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
    const { grade, section, parentId, educational_level_id, userId } = req.body
    const student = await studentService.createStudent({ user_id: userId, grade, section, parentId, createdAt: new Date(), updatedAt: new Date(), educational_level_id })
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

export const getFeedback = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(typeof (req.params.id))
    if (!(typeof (req.params.id) === 'string')) res.status(400).send({ error: 'Invalid id' })

    const { id } = req.params
    const academicRecords: Academic_records[] = await studentService.getFeedback(id)
    if (academicRecords.length === 0) res.status(204).send({ data: 'User dont have any feedback' })
    res.status(200).send({ data: academicRecords })
  } catch (e: any) {
    res.status(500).send({ err: 'Server error' })
  }
}
