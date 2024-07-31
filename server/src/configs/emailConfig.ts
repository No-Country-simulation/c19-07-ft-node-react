// src/config/emailConfig.ts
import nodemailer from 'nodemailer'
import { SendEmailError } from '../errors/sendEmailError'

const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar otro servicio de correo como Outlook, Yahoo, etc.
  auth: {
    type: 'OAUTH2',
    clientId: process.env.EMAIL_CLIENT_ID,
    clientSecret: process.env.EMAIL_CLIENT_SECRET,
    refreshToken: process.env.EMAIL_REFRESH_TOKEN,
    user: process.env.EMAIL_USER // Tu dirección de correo electrónico
  }
})

const sendEmail = async (to: string, subject: string, text: string): Promise<void> => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (err: any) {
    console.error('Error sending email:', err)
    throw new SendEmailError(err)
  }
}

export { sendEmail }
