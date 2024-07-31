import { Router } from 'express'
import academicAreaRoutes from '../academicArea/academicArea.routes'
import parentRoutes from '../parents/parents.routes'
import professorRoutes from '../professors/professors.routes'
import studentRoutes from '../students/students.routes'
import usersRoutes from '../users/users.routes'
import chatRoutes from '../chat/chat.routes'
import adminRoutes from '../admin/routes/admin.routes'
import alertRoutes from '../alerts/alerts.routes'
const router: Router = Router()

router.use('/academic-area', academicAreaRoutes)
router.use('/admin', adminRoutes)
router.use('/users', usersRoutes)
router.use('/students', studentRoutes)
router.use('/professors', professorRoutes)
router.use('/parents', parentRoutes)
router.use('/chat', chatRoutes)
router.use('/alerts', alertRoutes)

export default router
