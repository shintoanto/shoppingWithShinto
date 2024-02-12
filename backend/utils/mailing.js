import nodemailer from 'nodemailer';

const sendEMail = async (options) => {

    var transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
            user: SMTP_AUTH_USER,
            pass: "********7f8f"
        }
    });

    const message = {
        from: `${process.env.SMTP_FROM_NAME}  <${process.env.SMTP_FROM_EMAIL}`,
        to: options.email,
        subject: options.subject,
        html: options.message,
    };

    await transport.sendMail(message);
};

export default sendEMail;