import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config(); // Charge les variables d'environnement depuis le fichier .env

// Création du transporteur SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL, // Ton adresse Gmail
    pass: process.env.GMAIL_PASSWORD, // Le mot de passe d'application généré
  },
});

// Fonction pour envoyer un email
interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

export const sendContact = async (
  req: { body: ContactRequest },
  res: { status: (code: number) => { json: (body: ContactResponse) => void } },
) => {
  const { name, email, subject, message } = req.body;

  try {
    const info = await transporter.sendMail({
      from: email,
      to: "wildygamy.tlse@gmail.com",
      replyTo: email,
      subject: `Nouveau message de ${name} (${email}) : ${subject}`,
      text: `📩 Nouveau message reçu depuis le formulaire de contact :

👤 Nom : ${name}
✉️ Email : ${email}
📌 Sujet : ${subject}

💬 Message :
${message}

---
🚀 Cet email a été envoyé automatiquement depuis le site Wildy Gamy.
`,
    });

    res
      .status(200)
      .json({ success: true, message: "Email envoyé à l'équipe !" });
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email :", error);
    res.status(500).json({ success: false, message: "Erreur d'envoi" });
  }
};
