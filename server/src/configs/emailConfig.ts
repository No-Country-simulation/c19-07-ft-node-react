// src/config/emailConfig.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar otro servicio de correo como Outlook, Yahoo, etc.
  auth: {
    user: process.env.EMAIL_USER, // Tu dirección de correo electrónico
    pass: process.env.EMAIL_PASS, // Tu contraseña de correo electrónico
  },
});

const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export { sendEmail };
