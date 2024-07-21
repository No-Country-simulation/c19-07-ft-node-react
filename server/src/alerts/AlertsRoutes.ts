import { Router } from 'express';
import { alertController } from './AlertsController';

const alertRoutes = Router();


alertRoutes.get('/', alertController.getAllAlerts);
alertRoutes.post('/', alertController.createAlert);
alertRoutes.get('/:id', alertController.getAlertById);
alertRoutes.put('/:id', alertController.updateAlert);
alertRoutes.delete('/:id', alertController.deleteAlert);
alertRoutes.get('/academic-records/:studentId', alertController.getFeedback);
alertRoutes.post('/send-grades-email', alertController.sendGradesEmail); 


export default alertRoutes;
