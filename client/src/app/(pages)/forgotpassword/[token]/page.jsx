"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { authConfig } from "@/app/config/AuthConfig";
import { Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { matchPassword } from "@/app/utils/Validator";
import { updatePassword } from "@/app/services/AuthService";

const NewPassword = () => {
    const [password, setPassword] = useState({ password: "", confirmPassword: "" });
      const [disableButton, setDisableButton] = useState(true);
      const [error, setError] = useState({});
    

  const { token } = useParams();

   useEffect(() => {
      const hasErrors = Object.values(error).some((e) => e);
      setDisableButton(hasErrors);
    }, [error]);

    const handleSubmit = async() => {
        const validate = matchPassword(password.password, password.confirmPassword);
        if (validate) {
          let res = await updatePassword(email, password.password)
          if(res){
            window.location.replace("/auth/login")
          }
        }
      };
  const config = authConfig["changePass"];
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

export default NewPassword;
