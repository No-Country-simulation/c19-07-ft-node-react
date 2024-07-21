import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { alertRepository } from './AlertRepository';
import { sendEmail } from '../configs/emailConfig';

const prisma = new PrismaClient();

class AlertController {
  async getAllAlerts(req: Request, res: Response): Promise<void> {
    try {
      const alerts = await alertRepository.getAllAlerts();
      res.status(200).json(alerts);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while fetching alerts.' });
    }
  }

  async createAlert(req: Request, res: Response): Promise<void> {
    try {
      const alert = await alertRepository.createAlert(req.body);
      res.status(201).json(alert);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while creating the alert.' });
    }
  }

  async getAlertById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const alert = await alertRepository.getAlertById(id);
      if (alert) {
        res.status(200).json(alert);
      } else {
        res.status(404).json({ error: 'Alert not found.' });
      }
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while fetching the alert.' });
    }
  }

  async updateAlert(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const alert = await alertRepository.updateAlert(id, req.body);
      res.status(200).json(alert);
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while updating the alert.' });
    }
  }

  async deleteAlert(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await alertRepository.deleteAlert(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while deleting the alert.' });
    }
  }

  async getFeedback(req: Request, res: Response): Promise<void> {
    try {
      const { studentId } = req.params;
      const academicRecords = await alertRepository.getFeedback(studentId);
      if (academicRecords.length > 0) {
        res.status(200).json(academicRecords);
      } else {
        res.status(204).json({ message: 'No feedback available for this student.' });
      }
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while fetching feedback.' });
    }
  }

  // Envio de Correos
  async sendGradesEmail(req: Request, res: Response): Promise<void> {
    try {
      const { studentId, email } = req.body;
      const academicRecords = await alertRepository.getFeedback(studentId);

      if (academicRecords.length > 0) {
        // Asumiendo que los cursos están relacionados con los registros académicos
        const gradeText = await Promise.all(academicRecords.map(async (record) => {
          const course = await prisma.courses.findUnique({ where: { cursos_id: record.curso_id } });
          return `Subject: ${course?.nombre || 'Unknown'}, Grade: ${record.mark}`;
        }));
        const text = `Here are the grades for your child:\n\n${gradeText.join('\n')}`;

        // Envía el correo usando el transporter de Nodemailer
        await sendEmail(email, 'Your Child\'s Grades', text);
        res.status(200).json({ message: 'Email sent successfully' });
      } else {
        res.status(204).json({ message: 'No feedback available for this student.' });
      }
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while sending the email.' });
    }
  }
}

export const alertController = new AlertController();
