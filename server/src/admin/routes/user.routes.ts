/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { UserCtrl } from '../controller/user.ctrl'
import { ParentCtrl } from '../controller/parent.ctrl'
const userCtrl = new UserCtrl()
const parentCtrl = new ParentCtrl()
const router: Router = Router()

router.get('/users', userCtrl.getAllUsers)
router.get('/parents', parentCtrl.getAllParents)
router.post('/create-user', userCtrl.createUser)
router.put('/update-user/:id', userCtrl.updateUser)
router.delete('/delete-user/:id', userCtrl.softDeleteUser)
router.patch('/restore-user/:id', userCtrl.restoreUser)
export default router
