/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { alertController } from './alerts.controller'

const alertRoutes = Router()

alertRoutes.get('/', alertController.getAllAlerts)
alertRoutes.post('/', alertController.createAlert)
alertRoutes.get('/:id', alertController.getAlertById)
alertRoutes.patch('/:id', alertController.updateAlert)
alertRoutes.delete('/:id', alertController.deleteAlert)
alertRoutes.post('/send-grades-email', alertController.sendGradesEmail)

export default alertRoutes
