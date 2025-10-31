import { Resend } from "resend";

export const sendEmail = async (to, subject, template) => {
  try {
    const apiKey = process.env.RESEND_API_KEY

     if (!apiKey) {
      throw new Error("Missing RESEND_API_KEY in environment");
    }
    const resend = new Resend(apiKey);
    console.log(process.env.RESEND_API_KEY)
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
