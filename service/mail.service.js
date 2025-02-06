const nodemailer = require("nodemailer");

class MailService {
    constructor () {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        })
    }
    async sendMail(email, activationLink) {
        await this.transporter.sendMail({
          from: process.env.SMTP_USER,
          to: email,
          subject: `Activate your account ${activationLink}`,
          html: `
          <div>
            <a href="${activationLink}">Click to activate your account</a>
          </div>
          `,
        });
    }
}

module.exports = new MailService();