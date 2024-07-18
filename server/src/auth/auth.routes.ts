/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { AuthCtrl } from './auth.ctrl'
const authCtrl = new AuthCtrl()
const router: Router = Router()

router.post('/login', authCtrl.login)

router.post('/refresh-token', authCtrl.refreshToken)

router.post('/logout', authCtrl.logout)

export default router
