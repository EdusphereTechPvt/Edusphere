export const signupTemplate = (userName, school,dashboardLink, helpLink, demoLink, supportLink) => {

return `
<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>Welcome to Edusphere</title>
  </head>
  <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f4f7fb;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.1);margin-top:40px;">
      <tr>
        <td align="center" style="background-color:#3b82f6;padding:30px 20px;">
          <h1 style="color:#ffffff;margin:0;font-size:28px;">Welcome to Edusphere 🎓</h1>
          <p style="color:#e0e7ff;margin:8px 0 0 0;font-size:16px;">Empowering digital learning for the next generation</p>
        </td>
      </tr>

      <tr>
        <td style="padding:30px 40px;color:#111827;">
          <p style="font-size:16px;">Hello <strong>${userName}</strong>,</p>

          <p style="font-size:15px;line-height:1.6;">
            We’re thrilled to have you as part of the <strong>Edusphere family</strong>!  
            You’ve been successfully added to the <strong>${school}</strong> group.  
            We can’t wait to see the amazing things you’ll accomplish with Edusphere.
          </p>

          <p style="font-size:15px;line-height:1.6;">
            Get started by exploring your personalized dashboard, tracking performance, and managing your school activities seamlessly.  
            We’ve built Edusphere to make your educational journey simpler, faster, and more collaborative.
          </p>

          <div style="text-align:center;margin:30px 0;">
            <a href="${dashboardLink}" 
               style="background-color:#3b82f6;color:#ffffff;text-decoration:none;
                      padding:12px 28px;border-radius:6px;font-weight:bold;
                      font-size:16px;display:inline-block;">
              Take a Deep Dive 🚀
            </a>
          </div>

          <p style="font-size:14px;color:#4b5563;text-align:center;">
            If you have any questions or need help getting started, we’ve got you covered.
          </p>

          <div style="text-align:center;margin-top:20px;">
            <a href="${helpLink}" style="color:#3b82f6;text-decoration:none;margin:0 10px;font-size:14px;">Help Center</a> |
            <a href="${demoLink}" style="color:#3b82f6;text-decoration:none;margin:0 10px;font-size:14px;">Request a Demo</a> |
            <a href="${supportLink}" style="color:#3b82f6;text-decoration:none;margin:0 10px;font-size:14px;">Contact Support</a>
          </div>

          <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;" />

          <p style="font-size:12px;color:#9ca3af;text-align:center;">
            © 2025 Edusphere. All rights reserved. <br />
            Transforming education, one school at a time.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`
}