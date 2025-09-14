"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { styles } from "../../config/authConfig";
import Link from "next/link";

export default function ChangePasswordPage() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const handleUpdatePassword = () => {
    // TODO: Add API call here
    setPasswordUpdated(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.heading}>Change Password</h1>

        {/* New Password */}
        <label className={styles.label}>New Password</label>
        <div className="relative mb-4">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            className={`${styles.input} pl-10`}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}
        <label className={styles.label}>Confirm Password</label>
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm new password"
            className={`${styles.input} pl-10`}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Change Password Button */}
        <button onClick={handleUpdatePassword} className={styles.button}>
          Update Password
        </button>

        {/* Check Email OR Back to Login */}
        {passwordUpdated ? (
          <p className="mt-4 text-green-600 text-sm text-center">✅ Check your email</p>
        ) : (
          <Link href="/login">
            <button className={styles.backButton}>Back to Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}
