import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { AlertRepository } from './alerts.repository'
import { sendEmail } from '../configs/emailConfig'
import HTTP_STATUS from '../constants/statusCodeServer.const'
import { ConflictError } from '../errors/conflictError'
import * as alertsService from './alerts.service'
import { getErrorMessageAndStatus } from '../utils/getErrorMessageAndStatus'
import { ValidationError } from '../errors/validationError'
import { NotFoundError } from '../errors/notFoundError'

const prisma = new PrismaClient()
const alertRepository = new AlertRepository()

class AlertController {
  async getAllAlerts (req: Request, res: Response): Promise<void> {
    try {
      const alerts = await alertRepository.getAllAlerts()
      res.status(200).send(alerts)
    } catch (err) {
      res.status(500).send({ error: 'An error occurred while fetching alerts.' })
    }
  }

  async createAlert (req: Request, res: Response): Promise<void> {
    try {
      alertsService.validateAlertBody(req.body)
      await alertsService.createAlert(req.body)
      res.status(201).send()
    } catch (err: any) {
      const { message, status } = getErrorMessageAndStatus(err)
      res.status(status).send({ messsage: message, err_details: err.message })
    }
  }

  async getAlertById (req: Request, res: Response): Promise<void> {
    try {
      if (req.params.id === undefined || req.params.id === null) throw new ValidationError('Invalid alert id provided')
      const { id } = req.params
      const alert = await alertsService.getAlertById(id)
      if (alert === null) throw new NotFoundError('Alert not found', 404)
      res.status(200).send({ data: alert })
    } catch (err: any) {
      const { message, status } = getErrorMessageAndStatus(err)
      res.status(status).send({ messsage: message, err_details: err.message })
    }
  }

  async updateAlert (req: Request, res: Response): Promise<void> {
    try {
      if (req.params.id === undefined || req.params.id === null) throw new ValidationError('Invalid id provided')
      alertsService.validateUpdateAlertBody(req.body)
      const { id } = req.params
      await alertsService.updateAlert(id, req.body)
      res.status(204).send()
    } catch (err: any) {
      const { message, status } = getErrorMessageAndStatus(err)
      res.status(status).send({ messsage: message, err_details: err.message })
    }
  }

  async deleteAlert (req: Request, res: Response): Promise<void> {
    try {
      if (req.params.id === undefined || req.params.id == null) throw new ValidationError('Invalid id provided')
      const { id } = req.params
      await alertsService.deleteAlert(id)
      res.status(204).send()
    } catch (err: any) {
      const { message, status } = getErrorMessageAndStatus(err)
      res.status(status).send({ messsage: message, err_details: err.message })
    }
  }

  async getFeedback (req: Request, res: Response): Promise<void> {
    try {
      const { studentId } = req.params
      const academicRecords = await alertRepository.getFeedback(studentId)
      if (academicRecords.length > 0) {
        res.status(200).send(academicRecords)
      } else {
        res.status(204).send({ message: 'No feedback available for this student.' })
      }
    } catch (err: any) {
      const { message, status } = getErrorMessageAndStatus(err)
      res.status(status).send({ messsage: message, err_details: err.message })
    }
  }

  // Envio de Correos
  async sendGradesEmail (req: Request, res: Response): Promise<void> {
    try {
      alertsService.validateAlertBody(req.body)
      await alertsService.createAlert(req.body)
      const { studentId, email } = req.body
      const academicRecords = await alertRepository.getFeedback(studentId)
      if (academicRecords.length <= 0) throw new NotFoundError('Academic recrods not found', 404)
      // Asumiendo que los cursos están relacionados con los registros académicos
      const gradeText = await Promise.all(academicRecords.map(async (record) => {
        const course = await prisma.courses.findUnique({ where: { cursos_id: record.curso_id } })
        if (course === null) {
          throw new ConflictError('Course not found', HTTP_STATUS.NOT_FOUND)
        }
        return `Subject: ${course.nombre}, Grade: ${record.mark}`
      }))
      const text = `Here are the grades for your child:\n\n${gradeText.join('\n')}`

      // Envía el correo usando el transporter de Nodemailer
      await sendEmail(email, 'Your Child\'s Grades', text)
      res.status(200).send({ message: 'Email sent successfully' })
    } catch (err: any) {
      const { message, status } = getErrorMessageAndStatus(err)
      res.status(status).send({ messsage: message, err_details: err.message })
    }
  }
}

export const alertController = new AlertController()
