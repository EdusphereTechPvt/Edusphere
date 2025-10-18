import { Resend } from "resend";

export const sendEmail = async (to, subject, template) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const data = await resend.emails.send({
      from: "Edusphere Team <onboarding@resend.dev>",
      to: "eduspherextech@gmail.com", // TBD: verify domain else cant send to others
      subject,
      html: template,
    });
    console.log("Email sent:", data);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
