const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "Method Not Allowed",
        });
    }

    try {
        const { name, email, subject, message } = req.body;

        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        const receivedAt = new Date().toLocaleString("en-US", {
            dateStyle: "full",
            timeStyle: "short",
            timeZone: "UTC",
        });

        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Portfolio Inquiry</title>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; width: 100%;">
    <tr>
      <td align="center" style="padding: 12px;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; width: 100%; border-collapse: separate;">
          <tr>
            <td style="padding: 32px;">
              <h1 style="margin: 0 0 24px 0; font-size: 20px; font-weight: 600; color: #0f172a; line-height: 1.3;">New Portfolio Inquiry</h1>
              
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="width: 100%; margin-bottom: 20px;">
                <tr>
                  <td style="padding-bottom: 12px; width: 90px; vertical-align: top; font-size: 14px; font-weight: 600; color: #64748b;">Name:</td>
                  <td style="padding-bottom: 12px; vertical-align: top; font-size: 14px; color: #0f172a; font-weight: 500;">${name}</td>
                </tr>
                <tr>
                  <td style="padding-bottom: 12px; vertical-align: top; font-size: 14px; font-weight: 600; color: #64748b;">Email:</td>
                  <td style="padding-bottom: 12px; vertical-align: top; font-size: 14px; color: #0f172a;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding-bottom: 12px; vertical-align: top; font-size: 14px; font-weight: 600; color: #64748b;">Subject:</td>
                  <td style="padding-bottom: 12px; vertical-align: top; font-size: 14px; color: #0f172a; font-weight: 500;">${subject}</td>
                </tr>
              </table>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 0 0 20px 0;" />

              <div style="margin-bottom: 24px;">
                <div style="font-size: 14px; font-weight: 600; color: #64748b; margin-bottom: 8px;">Message:</div>
                <div style="font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap; background-color: #f8fafc; padding: 16px; border-radius: 6px; border: 1px solid #f1f5f9;">${message.replace(/\n/g, "<br>")}</div>
              </div>

              <div style="border-top: 1px solid #f1f5f9; padding-top: 16px; font-size: 12px; color: #94a3b8; line-height: 1.5;">
                <p style="margin: 0 0 4px 0;">Sent from portfolio: <a href="https://pavanporiya.com" style="color: #2563eb; text-decoration: none;">https://pavanporiya.com</a></p>
                <p style="margin: 0;">Received at: ${receivedAt} (UTC)</p>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
        });

        return res.status(200).json({
            success: true,
            message: "Message sent successfully.",
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Unable to send email.",
        });
    }
};