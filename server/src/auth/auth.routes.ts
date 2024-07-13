import { Router } from 'express'
import { AuthCtrl } from './auth.ctrl'
const authCtrl = new AuthCtrl()
const router: Router = Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/login', authCtrl.login)
router.post('/refreshToken', authCtrl.refreshToken)

export default router
