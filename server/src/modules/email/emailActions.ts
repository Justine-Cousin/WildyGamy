import type { Request, Response } from "express";
import { EmailRepository } from "./emailRepository";
import type { EmailData } from "./emailTypes";

class EmailActions {
  private emailRepository: EmailRepository;

  constructor() {
    this.emailRepository = new EmailRepository();
  }

  sendContact = async (req: Request, res: Response) => {
    try {
      const emailData: EmailData = req.body;
      await this.emailRepository.sendEmail(emailData);

      res.json({
        success: true,
        message: "Email envoyé avec succès",
      });
    } catch (error) {
      console.error("Erreur dans emailActions:", error);
      res.status(500).json({
        success: false,
        message: "Erreur lors de l'envoi de l'email",
      });
    }
  };
}

const emailActions = new EmailActions();
export default emailActions;
