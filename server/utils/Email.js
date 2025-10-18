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
    if (data.error) {
      console.error("Resend error:", data.error);
      throw new Error(data.error.message || "Email send failed");
    }

    console.log("Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error sending email:", error.message || error);
    throw error;
  }
};
