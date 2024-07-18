import { Router } from 'express'
import authRoutes from '../auth/auth.routes'
import academicAreaRoutes from '../academicArea/academicArea.routes'
const router: Router = Router()
router.use('/academic-area', academicAreaRoutes)
router.use('/auth', authRoutes)

export default router
