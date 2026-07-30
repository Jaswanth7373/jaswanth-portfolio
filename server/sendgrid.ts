import { MailService } from "@sendgrid/mail";
import nodemailer from "nodemailer";

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
  const sendgridKey = process.env.SENDGRID_API_KEY;
  const targetEmail = process.env.NOTIFICATION_EMAIL || "jaswanthsimha533@gmail.com";

  // Option 1: Gmail SMTP / Nodemailer
  if (gmailUser && gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });

      await transporter.sendMail({
        from: `"${params.subject}" <${gmailUser}>`,
        to: targetEmail,
        replyTo: params.replyTo,
        subject: params.subject,
        text: params.text || "",
        html: params.html,
      });

      console.log(`[EMAIL SUCCESS] Recruiter notification sent via Gmail to ${targetEmail}`);
      return true;
    } catch (err) {
      console.error("[GMAIL SMTP ERROR]:", err);
    }
  }

  // Option 2: SendGrid API
  if (sendgridKey) {
    try {
      const mailService = new MailService();
      mailService.setApiKey(sendgridKey);

      await mailService.send({
        to: targetEmail,
        from: params.from || targetEmail,
        subject: params.subject,
        text: params.text || "",
        html: params.html,
        replyTo: params.replyTo,
      });

      console.log(`[EMAIL SUCCESS] Recruiter notification sent via SendGrid to ${targetEmail}`);
      return true;
    } catch (error) {
      console.error("[SENDGRID ERROR]:", error);
    }
  }

  console.warn(
    "[EMAIL WARNING] No email credentials found (GMAIL_USER + GMAIL_APP_PASSWORD or SENDGRID_API_KEY). Message saved in storage."
  );
  return false;
}

