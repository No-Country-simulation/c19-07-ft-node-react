import { PrismaClient, Alerts, Academic_records, Students, Courses } from '@prisma/client';
import { sendEmail } from '../configs/emailConfig';

const prisma = new PrismaClient();

class AlertRepository {
  // Obtener todas las alertas
  async getAllAlerts(): Promise<Alerts[]> {
    return await prisma.alerts.findMany();
  }

  // Crear una nueva alerta
  async createAlert(data: Omit<Alerts, 'parent_id'>): Promise<Alerts> {
    return await prisma.alerts.create({ 
      data: { 
        ...data, 
        parent_id: data.parentId 
      } 
    });
  }

  // Obtener una alerta por ID
  async getAlertById(id: string): Promise<Alerts | null> {
    return await prisma.alerts.findUnique({ where: { parent_id: id } });
  }

  // Actualizar una alerta
  async updateAlert(id: string, data: Partial<Alerts>): Promise<Alerts> {
    return await prisma.alerts.update({ where: { parent_id: id }, data });
  }

  // Eliminar una alerta
  async deleteAlert(id: string): Promise<Alerts> {
    return await prisma.alerts.delete({ where: { parent_id: id } });
  }

  // Obtener feedback (o registros académicos)
  async getFeedback(studentId: string): Promise<Academic_records[]> {
    return await prisma.academic_records.findMany({ where: { student_id: studentId } });
  }

  // Enviar email con las calificaciones
  async sendGradesEmail(studentId: string, email: string): Promise<void> {
    try {
      // Obtén los registros académicos del estudiante
      const academicRecords = await this.getFeedback(studentId);

      if (academicRecords.length > 0) {
        // Formatea el contenido del email
        const gradeText = await Promise.all(academicRecords.map(async (record) => {
          const course = await prisma.courses.findUnique({ where: { cursos_id: record.curso_id } });
          return `Subject: ${course?.nombre || 'Unknown'}, Grade: ${record.mark}`;
        }));
        const text = `Here are the grades for your child:\n\n${gradeText.join('\n')}`;

        // Envía el email
        await sendEmail(email, 'Your Child\'s Grades', text);
        console.log('Email sent successfully to:', email);
      } else {
        console.log('No feedback available for student:', studentId);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  // Obtener todos los estudiantes con sus calificaciones
  async getAllStudentsWithGrades(): Promise<{ email: string; grades: Academic_records[] }[]> {
    try {
      // Recupera todos los estudiantes con sus registros académicos
      const studentsWithGrades = await prisma.students.findMany({
        include: {
          historiales_academicos: true, // Incluye los registros académicos del estudiante
          user: { // Incluye la información del usuario para obtener el email
            select: {
              email: true,
            },
          },
        },
      });

      // Mapea los datos para obtener el formato deseado
      return studentsWithGrades.map(student => ({
        email: student.user.email, // Asegúrate de que 'user' tenga un campo 'email'
        grades: student.historiales_academicos,
      }));
    } catch (error) {
      console.error('Error fetching students with grades:', error);
      return [];
    }
  }
}

export const alertRepository = new AlertRepository();
