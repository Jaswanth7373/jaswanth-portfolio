import fs from "fs";
import nodemailer from "nodemailer";

const envContent = fs.readFileSync(".env", "utf8");
const envVars = {};
envContent.split("\n").forEach((line) => {
  const parts = line.split("=");
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join("=").trim();
    envVars[key] = val;
  }
});

const user = envVars.GMAIL_USER || "jaswanthsimha533@gmail.com";
const pass = envVars.GMAIL_APP_PASSWORD;

console.log("Testing Gmail SMTP connection for:", user);

if (!pass) {
  console.error("GMAIL_APP_PASSWORD is missing in .env");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user, pass },
});

async function run() {
  try {
    const info = await transporter.sendMail({
      from: `"Portfolio Contact Form" <${user}>`,
      to: user,
      subject: "🎉 Live Test: Portfolio Recruiter Notification",
      text: "Hello Jaswanth! Your portfolio email notifications are active and connected to Gmail!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 24px; border: 2px solid #c8ff00; background: #080808; color: #fff; border-radius: 12px;">
          <h2 style="color: #c8ff00; margin-top: 0;">🎉 Email Notifications Active!</h2>
          <p>Hello Jaswanth,</p>
          <p>Your portfolio email notifications are working perfectly! Whenever a recruiter or client fills out the <strong>Get In Touch</strong> form on your site, you will receive their message instantly in this inbox.</p>
        </div>
      `,
    });
    console.log("SUCCESS! Test email delivered successfully! Message ID:", info.messageId);
  } catch (err) {
    console.error("ERROR sending test email:", err);
  }
}

run();
