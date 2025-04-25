import nodemailer from "nodemailer";

export const sendOTP = async (email: string, otp: string) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Authentication System <${process.env.GMAIL_USERNAME}>`,
    to: email,
    subject: "Verify Your Email - OTP",
    html: `<p>Your OTP is <b>${otp}</b>. It will expire in 10 minutes.</p>`,
  };

  return transporter.sendMail(mailOptions);
};
