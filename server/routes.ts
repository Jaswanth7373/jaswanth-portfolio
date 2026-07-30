import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { sendEmail } from "./sendgrid";
import { insertContactMessageSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { ZodError } from "zod";

const OWNER_EMAIL = "jaswanthsimha533@gmail.com";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/contact", async (req, res) => {
    try {
      const data = insertContactMessageSchema.parse(req.body);

      const saved = await storage.createContactMessage(data);

      const subjectLine = data.subject
        ? `Portfolio Contact: ${data.subject}`
        : `New message from ${data.name} via your portfolio`;

      const textBody = `You have a new message from your portfolio contact form.

Name: ${data.name}
Email: ${data.email}
Subject: ${data.subject || "(none)"}

Message:
${data.message}
`;

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">New Portfolio Contact Message</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
          <p><strong>Subject:</strong> ${escapeHtml(data.subject || "(none)")}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(data.message)}</p>
        </div>
      `;

      const emailSent = await sendEmail({
        to: OWNER_EMAIL,
        from: OWNER_EMAIL,
        replyTo: data.email,
        subject: subjectLine,
        text: textBody,
        html: htmlBody,
      });

      res.json({ success: true, id: saved.id, emailSent });
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ error: fromZodError(error).toString() });
      }
      console.error("Contact form error:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
