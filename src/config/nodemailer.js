import nodemailer from 'nodemailer';
import EMAIL_TEMPLATES from '~/utils/mailTemplates';
import { env } from './environment';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.NODEMAILER_SENDER_EMAIL,
    pass: env.NODEMAILER_SENDER_PASSWORD
  }
});

const options = ({ email, template, params }) => {
  const { subject, text, html } = EMAIL_TEMPLATES[template];

  return {
    from: `"Book Store 📖" <${env.NODE_MAILER_SENDER}>`,
    to: email,
    subject: subject,
    text: text(params),
    html: html(params)
  };
};

export const nodeMailer = {
  transporter,
  options
};
