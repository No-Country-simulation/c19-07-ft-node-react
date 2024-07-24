/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UserCtrl } from '../controller/user.ctrl'

const userCtrl = new UserCtrl()
const router: Router = Router()

router.get('/users', userCtrl.getAllUsers)

export default router
