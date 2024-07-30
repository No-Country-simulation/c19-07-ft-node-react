import cron from 'node-cron'
import { sendEmail } from './emailConfig'
import { Academic_records } from '@prisma/client'
import { AlertRepository } from '../alerts/alerts.repository'
const alertRepository = new AlertRepository()

// Define un tipo para los datos de los estudiantes con calificaciones
interface StudentWithGrades {
  email: string
  grades: Academic_records[]
}

const sendStudentGradesEmails = async () => {
  try {
    // Obtén todos los estudiantes con sus notas
    const students: StudentWithGrades[] = await alertRepository.getAllStudentsWithGrades()

    for (const student of students) {
      const { email, grades } = student

      // Asegúrate de que las propiedades están correctas
      const gradeText = grades.map(g => `Course ID: ${g.curso_id}, Grade: ${g.mark}`).join('\n')
      const text = `Here are the grades for your child:\n\n${gradeText}`

      await sendEmail(email, 'Your Child\'s Grades', text)
    }

    console.log('All emails sent successfully')
  } catch (error) {
    console.error('Error sending student grades emails:', error)
  }
}

// Programa la tarea para que se ejecute todos los lunes a las 8:00 AM
cron.schedule('0 8 * * 1', sendStudentGradesEmails)

console.log('Cron job scheduled to send student grades emails every Monday at 8:00 AM')

// Exporta la función si es necesario para pruebas u otras funcionalidades
export { sendStudentGradesEmails }

// Programar la tarea para que se ejecute todos los lunes a las 8:00 AM
// cron.schedule('0 8 * * 1', async () => {
//   console.log('Enviando correos electrónicos con las notas de los estudiantes...');
//   await sendStudentMarksEmail();
// });
