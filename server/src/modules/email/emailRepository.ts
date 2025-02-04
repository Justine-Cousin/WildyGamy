import { google } from "googleapis";
import nodemailer from "nodemailer";
import type { EmailData } from "./emailTypes";

export class EmailRepository {
  private oauth2CLient;
  private transporter: nodemailer.Transporter | undefined;

  constructor() {
    this.oauth2CLient = new google.auth.OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      "http://localhost:3000",
    );

    this.oauth2CLient.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });
  }

  async initializeTransporter() {
    const accessToken = await this.oauth2CLient.getAccessToken();

    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_EMAIL,
        clientId: process.env.GMAIL_CLIENT_ID,
        clientSecret: process.env.GMAIL_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_REFRESH_TOKEN,
      },
    });
  }

  async sendEmail(emailData: EmailData) {
    if (!this.transporter) {
      await this.initializeTransporter();
    }

    const mailOptions = {
      from: `${emailData.name} <${emailData.email}>`,
      to: process.env.GMAIL_EMAIL,
      subject: emailData.subject,
      text: `
            Nouveau message d: ${emailData.name}
            Email: ${emailData.email}

            Message:
            ${emailData.message}`,
    };

    try {
      if (this.transporter) {
        return await this.transporter.sendMail(mailOptions);
      }
      throw new Error("Transporter is not initialized");
    } catch (error) {
      console.error("Erreur d'envoi d'email:", error);
      throw new Error("Échec de l'envoi de l'email");
    }
  }
}
