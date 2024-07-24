/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { AcademicAreaCtrl } from './academicArea.ctrl'
import { verifyToken } from '../middlewares/verifyAccesToken.mdl'
const academicAreaCtrl = new AcademicAreaCtrl()
const router: Router = Router()

router.post('/create', verifyToken, academicAreaCtrl.createAcademicArea)
router.get('/',
  //  verifyToken,
  academicAreaCtrl.getAcademicAreas)
router.get('/:academicAreaId', verifyToken, academicAreaCtrl.getAcademicAreaById)
router.delete('/:academicAreaId', verifyToken, academicAreaCtrl.deleteAcademicAreaById)
router.put('/:academicAreaId', verifyToken, academicAreaCtrl.AcademicAreaPutById)
export default router
