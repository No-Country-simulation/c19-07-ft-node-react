import { Router } from 'express'
import academicAreaRoutes from '../academicArea/academicArea.routes'
import authRoutes from '../auth/auth.routes'
import parentRoutes from '../parents/parents.routes'
import professorRoutes from '../professors/professors.routes'
import studentRoutes from '../students/students.routes'
import usersRoutes from '../users/users.routes'
import chatRoutes from '../chat/chat.routes'
import { verifyToken } from '../middlewares/verifyAccesToken.mdl'

const router: Router = Router()
router.use('/academic-area', verifyToken, academicAreaRoutes)
router.use('/auth', authRoutes)
router.use('/users', verifyToken, usersRoutes)
router.use('/students', verifyToken, studentRoutes)
router.use('/professors', verifyToken, professorRoutes)
router.use('/parents', verifyToken, parentRoutes)
router.use('/chat', verifyToken, chatRoutes)
export default router
