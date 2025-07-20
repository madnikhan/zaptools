import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, subject, message, type } = req.body;

  if (!email || (!message && !type)) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Setup Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  let mailSubject = subject || 'New Contact Form Submission';
  let mailText = '';

  if (type === 'waitlist') {
    mailSubject = 'New Waitlist Signup';
    mailText = `Email: ${email}`;
  } else {
    mailText = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
  }

  try {
    await transporter.sendMail({
      from: `ZapTools <${process.env.SMTP_USER}>`,
      to: 'info@inventix-studio.online',
      subject: mailSubject,
      text: mailText,
    });
    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed to send email', error: (error as Error).message });
  }
} 