"use client";

import { useState } from "react";
import { Shield, GraduationCap, User, Users, Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [role, setRole] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);

  const roles = [
    { name: "Administrator", description: "Manage system", icon: Shield },
    { name: "Teacher", description: "Create courses", icon: GraduationCap },
    { name: "Student", description: "Access learning", icon: User },
    { name: "Parent", description: "Track progress", icon: Users },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-3 sm:px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-10 md:p-14 flex flex-col justify-start">
        
        {/* Header */}
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
          Welcome Back to <span className="text-blue-600">Edusphere</span>
        </h2>
        <p className="text-xs sm:text-sm text-center text-gray-500 mt-2">
          Log in to your account
        </p>

        {/* Role Selection */}
        <div className="mt-6 sm:mt-8">
          <h3 className="text-gray-800 font-medium mb-3 sm:mb-4 text-xs sm:text-base text-center">
            Select Your Role
          </h3>
          <div className="flex flex-row justify-between gap-2 sm:gap-4">
            {roles.map(({ name, description, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setRole(name)}
                className={`flex flex-col items-center justify-center p-1 sm:p-2 rounded-lg sm:rounded-xl border transition-all duration-300
                  w-[22%] h-24 sm:h-28 md:h-32
                  ${role === name
                    ? "border-blue-500 bg-blue-50 shadow-md scale-105"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-sm"
                  }`}
              >
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full mb-1 sm:mb-2
                    ${role === name ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400"}`}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </div>
                <h4
                  className={`font-semibold text-[9px] sm:text-xs md:text-sm text-center ${
                    role === name ? "text-blue-600" : "text-gray-800"
                  }`}
                >
                  {name}
                </h4>
                <p className="text-[7px] sm:text-[9px] md:text-[10px] text-gray-500 text-center mt-0.5 sm:mt-1 truncate">
                  {description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="email"
              placeholder="Email address"
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full pl-9 sm:pl-10 pr-9 sm:pr-10 py-2.5 sm:py-3 text-xs sm:text-sm text-gray-900 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-200 focus:outline-none transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <label className="flex items-center gap-1.5 sm:gap-2 text-gray-700">
              <input type="checkbox" className="rounded border-gray-300 scale-90 sm:scale-100" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm transition"
          >
            Log In as {role}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-4 sm:my-6">
          <div className="flex-grow h-px bg-gray-300" />
          <span className="px-2 text-gray-400 text-xs sm:text-sm">OR</span>
          <div className="flex-grow h-px bg-gray-300" />
        </div>

        {/* Google Login (UI Only) */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 sm:py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-4 h-4 sm:w-5 sm:h-5"
          />
          Continue with Google
        </button>

        {/* Register */}
        <p className="mt-5 sm:mt-6 text-center text-xs sm:text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="#" className="text-blue-600 font-medium hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
