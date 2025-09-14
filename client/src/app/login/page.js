"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { roles, styles } from "../../config/authconfig";

export default function LoginPage() {
  const [role, setRole] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* Header */}
        <h2 className={styles.heading}>
          Welcome Back to <span className="text-blue-600">Edusphere</span>
        </h2>
        <p className={styles.subHeading}>Log in to your account</p>

        {/* Role Selection */}
        <div className="mt-6">
          <h3 className={styles.roleTitle}>Select Your Role</h3>
          <div className={styles.roleGrid}>
            {roles.map(({ name, description, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setRole(name)}
                className={styles.roleBtn(role === name)}
              >
                <Icon className={styles.roleIcon(role === name)} />
                <h4 className={styles.roleText(role === name)}>{name}</h4>
                <p className={styles.roleDesc}>{description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className={styles.inputWrapper}>
            <Mail className={styles.inputIcon} />
            <input type="email" placeholder="Email address" className={styles.input} />
          </div>

          <div className={styles.inputWrapper}>
            <Lock className={styles.inputIcon} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles.input}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={styles.passwordToggle}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {/* Options */}
          <div className={styles.optionsWrapper}>
            <label className={styles.rememberLabel}>
              <input type="checkbox" className={styles.rememberBox} />
              Remember me
            </label>
            <a href="#" className={styles.forgotLink}>
              Forgot password?
            </a>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Log In as {role}
          </button>
        </form>

        {/* Register */}
        <p className={styles.registerText}>
          Don’t have an account?{" "}
          <a href="#" className={styles.registerLink}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
