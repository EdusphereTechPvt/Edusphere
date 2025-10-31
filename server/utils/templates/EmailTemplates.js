export const signupTemplate = (userName, school, isAdmin) => {

  const passwordNote = !isAdmin
    ? `<p style="font-size:15px;line-height:1.6;color:#111827;">
        Please note: Your password is generated using your <strong>first name</strong> and your <strong>date of birth</strong> in the format 
        <code>Firstname@YYYYMMDD</code>. <br/><br/>
        For example, if your name is <strong>Edusphere Team</strong> and your date of birth is <strong>15th August 2000</strong>, your password will be: 
        <code>Edusphere@20000815</code>.
      </p>`
    : "";

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

          ${passwordNote}

          <p style="font-size:15px;line-height:1.6;">
            Get started by exploring your personalized dashboard, tracking performance, and managing your school activities seamlessly.  
            We’ve built Edusphere to make your educational journey simpler, faster, and more collaborative.
          </p>

          <div style="text-align:center;margin:30px 0;">
            <a href="${process.env.FRONTEND_URL}/dashboard" 
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
            <a href="${process.env.FRONTEND_URL}/help" style="color:#3b82f6;text-decoration:none;margin:0 10px;font-size:14px;">Help Center</a> |
            <a href="${process.env.FRONTEND_URL}/demo" style="color:#3b82f6;text-decoration:none;margin:0 10px;font-size:14px;">Request a Demo</a> |
            <a href="${process.env.FRONTEND_URL}/contact" style="color:#3b82f6;text-decoration:none;margin:0 10px;font-size:14px;">Contact Support</a>
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

export const resetPasswordTemplate = (name,token) => {
  return `
  <!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1.0" />
    <title>Reset Your Edusphere Password</title>
  </head>
  <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f4f7fb;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.1);margin-top:40px;">
      <tr>
        <td align="center" style="background-color:#3b82f6;padding:30px 20px;">
          <h1 style="color:#ffffff;margin:0;font-size:28px;">Reset Your Password 🔐</h1>
          <p style="color:#e0e7ff;margin:8px 0 0 0;font-size:16px;">Your security matters to us at Edusphere</p>
        </td>
      </tr>

      <tr>
        <td style="padding:30px 40px;color:#111827;">
          <p style="font-size:16px;">Hello <strong>${name}</strong>,</p>

          <p style="font-size:15px;line-height:1.6;">
            We received a request to reset your password for your <strong>Edusphere</strong> account.
            If this was you, you can safely reset your password using the link below.
          </p>

          <div style="text-align:center;margin:30px 0;">
            <a href="${process.env.FRONTEND_URL}/forgotpassword/${token}" 
               style="background-color:#3b82f6;color:#ffffff;text-decoration:none;
                      padding:12px 28px;border-radius:6px;font-weight:bold;
                      font-size:16px;display:inline-block;">
              Reset My Password 🔁
            </a>
          </div>

          <p style="font-size:14px;line-height:1.6;color:#4b5563;">
            This link will be active for the next <strong>10 minutes</strong>.  
            If you did not request a password reset, please ignore this message — your account will remain secure.
          </p>

          <p style="font-size:14px;color:#4b5563;margin-top:20px;">
            After resetting, you’ll be able to access your dashboard and continue your learning journey smoothly.
          </p>

          <div style="text-align:center;margin-top:30px;">
            <a href="${process.env.FRONTEND_URL}/help" style="color:#3b82f6;text-decoration:none;margin:0 10px;font-size:14px;">Help Center</a> |
            <a href="${process.env.FRONTEND_URL}/contact" style="color:#3b82f6;text-decoration:none;margin:0 10px;font-size:14px;">Contact Support</a>
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

export const studentSignupTemplate = (studentName, schoolName) => {
  const dobNote = `
    <p style="font-size:15px;line-height:1.6;color:#111827;">
      Please note: Your password is generated using your <strong>first name</strong> and your <strong>date of birth</strong> in the format 
      <code>Firstname@YYYYMMDD</code>. <br/><br/>
      For example, if your name is <strong>${studentName}</strong> and your date of birth is <strong>15th August 2008</strong>, 
      your password will be: <code>${studentName.split(" ")[0]}@20080815</code>.
    </p>
  `;

  return `
  <!DOCTYPE html>
  <html lang="en" style="margin:0;padding:0;">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <title>Welcome to Edusphere</title>
    </head>
    <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f4f7fb;">
      <table align="center" width="100%" cellpadding="0" cellspacing="0" 
        style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;
               box-shadow:0 4px 16px rgba(0,0,0,0.1);margin-top:40px;">
        
        <!-- Header -->
        <tr>
          <td align="center" style="background-color:#3b82f6;padding:30px 20px;">
            <h1 style="color:#ffffff;margin:0;font-size:28px;">Welcome to Edusphere 🎓</h1>
            <p style="color:#e0e7ff;margin:8px 0 0 0;font-size:16px;">Empowering digital learning for the next generation</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px 40px;color:#111827;">
            <p style="font-size:16px;">Hello <strong>${studentName}</strong>,</p>

            <p style="font-size:15px;line-height:1.6;">
              You’ve been successfully added to the <strong>${schoolName}</strong> group as a <strong>Student</strong>!  
              Welcome aboard — your journey of learning, growth, and success starts here.
            </p>

            ${dobNote}

            <p style="font-size:15px;line-height:1.6;">
              Get started by exploring your personalized dashboard, checking announcements, and tracking your progress — all in one place.
            </p>

            <div style="text-align:center;margin:30px 0;">
              <a href="${process.env.FRONTEND_URL}/dashboard" 
                 style="background-color:#3b82f6;color:#ffffff;text-decoration:none;
                        padding:12px 28px;border-radius:6px;font-weight:bold;
                        font-size:16px;display:inline-block;">
                Go to Dashboard 🚀
              </a>
            </div>

            <p style="font-size:14px;color:#4b5563;text-align:center;">
              If you have any questions or need help getting started, we’ve got you covered.
            </p>

            <div style="text-align:center;margin-top:20px;">
              <a href="${process.env.FRONTEND_URL}/help" style="color:#3b82f6;text-decoration:none;margin:0 10px;font-size:14px;">Help Center</a> |
              <a href="${process.env.FRONTEND_URL}/contact" style="color:#3b82f6;text-decoration:none;margin:0 10px;font-size:14px;">Contact Support</a>
            </div>

            <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;" />

            <p style="font-size:12px;color:#9ca3af;text-align:center;">
              © 2025 Edusphere. All rights reserved. <br />
              Transforming education, one student at a time.
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};


export const parentSignupTemplate = (parentName, schoolName) => {
  const dobNote = `
    <p style="font-size:15px;line-height:1.6;color:#111827;">
      Please note: Your password is generated using your <strong>first name</strong> and <strong>date of birth</strong> in the format 
      <code>Firstname@YYYYMMDD</code>. <br/><br/>
      For example, if your name is <strong>${parentName}</strong> and your date of birth is <strong>20th March 1985</strong>, 
      your password will be: <code>${parentName.split(" ")[0]}@19850320</code>.
    </p>
  `;

  return `
  <!DOCTYPE html>
  <html lang="en" style="margin:0;padding:0;">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <title>Welcome to Edusphere</title>
    </head>
    <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f4f7fb;">
      <table align="center" width="100%" cellpadding="0" cellspacing="0" 
        style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;
               box-shadow:0 4px 16px rgba(0,0,0,0.1);margin-top:40px;">
        
        <!-- Header -->
        <tr>
          <td align="center" style="background-color:#3b82f6;padding:30px 20px;">
            <h1 style="color:#ffffff;margin:0;font-size:28px;">Welcome to Edusphere 👪</h1>
            <p style="color:#e0e7ff;margin:8px 0 0 0;font-size:16px;">Empowering digital learning for every parent</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px 40px;color:#111827;">
            <p style="font-size:16px;">Hello <strong>${parentName}</strong>,</p>

            <p style="font-size:15px;line-height:1.6;">
              You’ve been successfully added to the <strong>${schoolName}</strong> group as a <strong>Parent</strong>!  
              Now you can easily stay connected with your child’s academic progress, attendance, and school updates through Edusphere.
            </p>

            ${dobNote}

            <p style="font-size:15px;line-height:1.6;">
              Access your personalized parent dashboard to stay informed and involved in your child’s education journey.
            </p>

            <div style="text-align:center;margin:30px 0;">
              <a href="${process.env.FRONTEND_URL}/dashboard" 
                 style="background-color:#3b82f6;color:#ffffff;text-decoration:none;
                        padding:12px 28px;border-radius:6px;font-weight:bold;
                        font-size:16px;display:inline-block;">
                Go to Dashboard 🚀
              </a>
            </div>

            <p style="font-size:14px;color:#4b5563;text-align:center;">
              Need help getting started? We’re always here for you.
            </p>

            <div style="text-align:center;margin-top:20px;">
              <a href="${process.env.FRONTEND_URL}/help" style="color:#3b82f6;text-decoration:none;margin:0 10px;font-size:14px;">Help Center</a> |
              <a href="${process.env.FRONTEND_URL}/contact" style="color:#3b82f6;text-decoration:none;margin:0 10px;font-size:14px;">Contact Support</a>
            </div>

            <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;" />

            <p style="font-size:12px;color:#9ca3af;text-align:center;">
              © 2025 Edusphere. All rights reserved. <br/>
              Building stronger school–parent connections every day.
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};

export const demoRequestTemplate = (
  name,
  schoolName,
  email,
  phone,
  schoolSize,
  preferredDate,
  features,
  reference,
  message
) => {
  return `
  <!DOCTYPE html>
  <html lang="en" style="margin:0;padding:0;">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <title>New Demo Request - Edusphere</title>
    </head>
    <body style="margin:0;padding:0;font-family:Arial,Helvetica,sans-serif;background-color:#f4f7fb;">
      <table align="center" width="100%" cellpadding="0" cellspacing="0" 
        style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;
               box-shadow:0 4px 16px rgba(0,0,0,0.1);margin-top:40px;">
        
        <!-- Header -->
        <tr>
          <td align="center" style="background-color:#3b82f6;padding:30px 20px;">
            <h1 style="color:#ffffff;margin:0;font-size:28px;">New Demo Request 📩</h1>
            <p style="color:#e0e7ff;margin:8px 0 0 0;font-size:16px;">A new school is interested in Edusphere!</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:30px 40px;color:#111827;">
            <p style="font-size:16px;">Hello Team,</p>

            <p style="font-size:15px;line-height:1.6;">
              A new demo request has been received from <strong>${schoolName}</strong>.  
              Here are the details:
            </p>

            <table width="100%" cellpadding="8" cellspacing="0" 
                   style="border-collapse:collapse;background:#f9fafb;border-radius:8px;margin:20px 0;">
              <tr>
                <td style="font-weight:bold;width:40%;">Contact Person:</td>
                <td>${name}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Email:</td>
                <td>${email}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Phone:</td>
                <td>${phone}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">School Name:</td>
                <td>${schoolName}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">School Size:</td>
                <td>${schoolSize}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Preferred Demo Date:</td>
                <td>${preferredDate}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Features Interested In:</td>
                <td>${features || "Not specified"}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Reference / Source:</td>
                <td>${reference || "N/A"}</td>
              </tr>
              <tr>
                <td style="font-weight:bold;">Message:</td>
                <td>${message || "No additional message provided"}</td>
              </tr>
            </table>

            <p style="font-size:15px;line-height:1.6;">
              Please reach out to the school representative to schedule and confirm their demo.
            </p>

            <div style="text-align:center;margin:30px 0;">
              <a href="${process.env.FRONTEND_URL}/admin/demo-requests" 
                 style="background-color:#3b82f6;color:#ffffff;text-decoration:none;
                        padding:12px 28px;border-radius:6px;font-weight:bold;
                        font-size:16px;display:inline-block;">
                View Demo Requests 🚀
              </a>
            </div>

            <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;" />

            <p style="font-size:12px;color:#9ca3af;text-align:center;">
              © 2025 Edusphere. All rights reserved. <br/>
              Building smarter schools, one demo at a time.
            </p>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
