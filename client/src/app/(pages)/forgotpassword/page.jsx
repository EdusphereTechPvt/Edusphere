"use client";

import { useState } from "react";
import { authConfig } from "@/app/config/AuthConfig";
import { isUserAvailable } from "@/app/services/AuthService";
import { validateField } from "@/app/utils/Validator";
import { EmailOutlined } from "@mui/icons-material";


export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const handleVerifyEmail = async () => {
    if (!validateField(authConfig["forgotPassword"].fields[0], email)) return;
    let res = await isUserAvailable({ email });
    setValidEmail(res || false);
  };

  return !validEmail ? (
    <ForgotPassword
      email={email}
      setEmail={setEmail}
      handleVerifyEmail={handleVerifyEmail}
    />
  ) : (
   <EmailSent email={email} />
  );
}
const ForgotPassword = ({ email, setEmail, handleVerifyEmail }) => {
  const config = authConfig["forgotPassword"];
  return (
    <div className={config.styles.container}>
      <div className={config.styles.form}>
        <h2 className={config.styles.title}>Forgot Password</h2>
        <p className="text-gray-600 text-sm mb-4">
          Enter your email to receive a password reset link
        </p>
        <div>
          {config.fields.map((field, index) => (
            <div className={config.styles.inputGroup} key={index}>
              <field.icon className={config.styles.icon} />
              <input
                type={field.type}
                placeholder={field.label}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={config.styles.input}
                required={field.required}
              />
            </div>
          ))}
        </div>
        <button onClick={() => handleVerifyEmail()} className={config.styles.button}>
          Send Reset Link
        </button>
        <a href="/auth/login" className={config.styles.link}>
          Back to Login
        </a>
      </div>
    </div>
  );
};

const EmailSent = ({ email }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-50 to-white px-6 text-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full">
            <EmailOutlined style={{ fontSize: 50, color: "#1E88E5" }} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Check your email 📬
        </h2>
        <p className="text-gray-600 mb-4">
          We’ve sent a password reset link to
          <span className="font-semibold text-blue-600"> {email}</span>.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Please check your inbox (and spam folder) and follow the instructions
          to reset your password. The link will expire in 15 minutes.
        </p>
        <div className="space-y-2">
          <a
            href="/auth/login"
            className="block bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Login
          </a>
          <p className="text-xs text-gray-400">
            Didn’t get the email? <a href="#" className="text-blue-500 hover:underline">Resend</a>
          </p>
        </div>
      </div>
    </div>
  );
}
