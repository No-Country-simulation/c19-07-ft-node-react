/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { StudentCtl } from '../controllers/student.ctl'
const studentctl = new StudentCtl()
const router = Router()

router.get('/dashboard/:studentId', studentctl.getDashboardData)
router.get('/get-evaluations-by-periodo', studentctl.getEvaluationsByPeriodoOfStudent)
export default router
