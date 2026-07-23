const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

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

        await resend.emails.send({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: ["pavanporiya@gmail.com"],
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
        <h2>New Portfolio Contact</h2>

        <p><strong>Name:</strong> ${name}</p>

        <p><strong>Email:</strong> ${email}</p>

        <p><strong>Subject:</strong> ${subject}</p>

        <hr>

        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
        });

        return res.status(200).json({
            success: true,
            message: "Message sent successfully.",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong.",
        });
    }
};