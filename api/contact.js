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
<body style="margin: 0; padding: 32px 16px; background-color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0f172a; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; width: 100%;">
    <tr>
      <td align="center" style="padding: 12px 0;">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; width: 100%; border-collapse: separate;">
          <tr>
            <td style="padding: 32px 28px;">
              <h1 style="margin: 0 0 24px 0; font-size: 22px; font-weight: 700; color: #0f172a; line-height: 1.3;">New Portfolio Inquiry</h1>

              <div style="margin-bottom: 14px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 16px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px;">Name</div>
                <div style="font-size: 15px; font-weight: 600; color: #0f172a; word-break: break-word;">${name}</div>
              </div>

              <div style="margin-bottom: 14px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 16px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px;">Email</div>
                <div style="font-size: 15px; font-weight: 500; color: #0f172a; word-break: break-word;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></div>
              </div>

              <div style="margin-bottom: 20px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 14px 16px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 4px;">Subject</div>
                <div style="font-size: 15px; font-weight: 600; color: #0f172a; word-break: break-word;">${subject}</div>
              </div>

              <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 0 0 20px 0;" />

              <div style="margin-bottom: 24px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 16px;">
                <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; margin-bottom: 8px;">Message</div>
                <div style="font-size: 15px; line-height: 1.6; color: #1e293b; white-space: pre-wrap; word-break: break-word;">${message.replace(/\n/g, "<br>")}</div>
              </div>

              <div style="border-top: 1px solid #e2e8f0; padding-top: 18px; font-size: 13px; color: #64748b; line-height: 1.5;">
                <p style="margin: 0 0 4px 0; font-weight: 500;">Sent from Portfolio Website: <a href="https://pavanporiya.com" style="color: #2563eb; text-decoration: none;">https://pavanporiya.com</a></p>
                <p style="margin: 0; color: #94a3b8; font-size: 12px;">Submitted at ${receivedAt} (UTC)</p>
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