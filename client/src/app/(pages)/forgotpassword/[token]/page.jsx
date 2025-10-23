"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { authConfig } from "@/app/config/AuthConfig";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { matchPassword, validateField } from "@/app/utils/Validator";
import { updatePassword, verifyTemporaryToken } from "@/app/services/AuthService";

const NewPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState({ password: "", confirmPassword: "" });
  const [visible, setVisible] = useState({ password: false, confirmPassword: false });
  const [disableButton, setDisableButton] = useState(true);
  const [error, setError] = useState({});
  const [validToken, setValidToken] = useState(false);
  const [userId, setUserId] = useState(null);
  const config = authConfig["changePass"];

  useEffect(() => {
    const verifyToken = async () => {
      const id = await verifyTemporaryToken(decodeURIComponent(token));
      if (id) {
        setValidToken(true);
        setUserId(id);
      } else {
        setValidToken(false);
      }
    };
    verifyToken();
  }, [token]);

  useEffect(() => {
    const hasErrors = Object.values(error).some((e) => e);
    setDisableButton(hasErrors || !password.password || !password.confirmPassword);
  }, [error, password]);

  const handleBlur = (field, value) => {
    let valid = validateField(field, value);
    if (field.name === "confirmPassword" && valid) {
      valid = matchPassword(password.password, password.confirmPassword);
    }
    setError((prev) => ({ ...prev, [field.name]: !valid }));
  };

  const handleSubmit = async () => {
    const isValid = matchPassword(password.password, password.confirmPassword);
    if (isValid && userId) {
      const res = await updatePassword(userId, password.password, decodeURIComponent(token));
      if (res) {
        window.location.replace("/auth/login");
      }
    }
  };

 if (!validToken)
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-700 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Invalid or Expired Link
        </h2>
        <p className="text-gray-500 mb-6">
          The password reset link you used is no longer valid. It might have expired or been used already.
        </p>
        <a
          href="/forgotpassword"
          className="inline-block px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium shadow-md hover:shadow-lg"
        >
          Request a New Link
        </a>
      </div>
    </div>
  );

   return (
    <div className={config.styles.container}>
      <div className={config.styles.card}>
        <h1 className={config.styles.heading}>Change Password</h1>

        {config.fields.map((field, index) => (
          <div key={index}>
            <label className={config.styles.label}>{field.label}</label>
            <div className="relative mb-4">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={visible[field.name] ? "text" : "password"}
                placeholder={field.label}
                value={password[field.name] || ""}
                onChange={(e) => setPassword({ ...password, [field.name]: e.target.value })}
                onBlur={() => handleBlur(field, password[field.name])}
                className={`${config.styles.input} pl-10`}
              />
              <button
                type="button"
                onClick={() => setVisible({ ...visible, [field.name]: !visible[field.name] })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {visible[field.name] ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={handleSubmit}
          disabled={disableButton}
          className={`${config.styles.button} ${disableButton ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          Update Password
        </button>
      </div>
    </div>
  );
};

export default NewPassword;
