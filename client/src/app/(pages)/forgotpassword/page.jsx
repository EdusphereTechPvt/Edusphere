"use client";

import { useEffect, useState } from "react";
import { authconfig } from "@/app/config/AuthConfig";
import { isUserAvailable, updatePassword } from "@/app/services/AuthService";
import { matchPassword, validateField } from "@/app/utils/Validator";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState({ password: "", confirmPassword: "" });
  const [disableButton, setDisableButton] = useState(true);
  const [error, setError] = useState({});

  useEffect(() => {
    const hasErrors = Object.values(error).some((e) => e);
    setDisableButton(hasErrors);
  }, [error]);

  useEffect(() => {
    setError({});
  }, [validEmail]);

  const handleSubmit = async() => {
    const validate = matchPassword(password.password, password.confirmPassword);
    if (validate) {
      let res = await updatePassword(email, password.password)
      if(res){
        window.location.replace("/auth/login")
      }
    }
  };

  const handleVerifyEmail = async () => {
    if (!validateField(authconfig["forgotPassword"].fields[0], email)) return;
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
    <ChangePassword
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      setError={setError}
      disableButton={disableButton}
    />
  );
}

const ChangePassword = ({ password, setPassword, handleSubmit, setError, disableButton }) => {
  const config = authconfig["changePass"];
  const [visible, setVisible] = useState({ password: false, confirmPassword: false });

  const handleBlur = (field, value) => {
    let validate = validateField(field, value);
    if (field.name === "confirmPassword" && validate && password.password && password.confirmPassword) {
      validate = matchPassword(password.password, password.confirmPassword);
    }
    setError((prev) => ({ ...prev, [field.name]: !validate }));
  };

  return (
    <div className={config.styles.container}>
      <div className={config.styles.card}>
        <h1 className={config.styles.heading}>Change Password</h1>
        {config.fields.map((field, index) => (
          <div key={index}>
            <label className={config.styles.label}>{field.label}</label>
            <div className="relative mb-4">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type={visible[field.name] ? "text" : "password"}
                placeholder={field.label}
                value={password[field.name] || ""}
                onBlur={() => handleBlur(field, password[field.name])}
                onChange={(e) => setPassword({ ...password, [field.name]: e.target.value })}
                className={`${config.styles.input} pl-10`}
              />
              <button
                type="button"
                onClick={() =>
                  setVisible({ ...visible, [field.name]: !visible[field.name] })
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {visible[field.name] ? <VisibilityOff size={18} /> : <Visibility size={18} />}
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={handleSubmit}
          disabled={disableButton}
          style={disableButton ? { backgroundColor: "gray" } : {}}
          className={config.styles.button}
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

const ForgotPassword = ({ email, setEmail, handleVerifyEmail }) => {
  const config = authconfig["forgotPassword"];
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
