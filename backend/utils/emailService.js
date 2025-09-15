require("dotenv").config();
const nodemailer = require("nodemailer");

// Configure Nodemailer (Gmail SMTP)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify transporter once at startup
transporter
  .verify()
  .then(() => console.log("📧 Email transporter verified (Gmail SMTP)"))
  .catch((err) => console.error("❌ Email transporter verification failed:", err));

/**
 * Send an email with either an OTP or a verification link.
 * @param {string} to - Recipient email.
 * @param {string} type - "otp" for OTP email, "verification" for email verification link.
 * @param {string} data - OTP code or verification token.
 */
const sendEmail = async (to, type, data) => {
  try {
    let subject, htmlContent;

    if (type === "otp") {
      subject = "Your OTP for Email Verification";
      htmlContent = `
        <h2>Your OTP Code</h2>
        <p>Use the OTP below to verify your email:</p>
        <h1 style="color:blue;">${data}</h1>
        <p>This OTP is valid for 10 minutes.</p>
      `;
    } else if (type === "verification") {
      const link = `${process.env.FRONTEND_URL}/verify-email?token=${data}`;
      subject = "Verify Your Email";
      htmlContent = `
        <h2>Click the link below to verify your email:</h2>
        <a href="${link}" target="_blank">${link}</a>
        <p>If you did not request this, please ignore this email.</p>
      `;
    } else {
      throw new Error("Invalid email type specified.");
    }

    const mailOptions = {
      from: `"Club Management" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ ${type === "otp" ? "OTP" : "Verification"} email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error(`❌ Error sending ${type} email to ${to}:`, error);
    throw error;
  }
};

module.exports = sendEmail;
