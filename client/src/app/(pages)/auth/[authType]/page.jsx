"use client";
import { useState, useEffect } from "react";
import { TextField, Typography, Button, Divider, Box } from "@mui/material";
import { roles, authconfig } from "@/app/config/AuthConfig.jsx";
import { showToast } from "@/app/utils/Toast.jsx";
import { matchPassword, validateField } from "@/app/utils/Validator.jsx";
import { authenticateUser, handleOAuthLogin } from "@/app/services/AuthService.jsx";
import { useParams, useRouter } from "next/navigation.js";
import { googleProvider } from "@/app/utils/Firebase";

export default function AuthPage() {
  const router = useRouter();
  const [activeRole, setActiveRole] = useState("admin");
  const [mode, setMode] = useState("signup");
  const [fields, setFields] = useState({});
  const [state, setState] = useState({ terms: false, consent: false });
  const [error, setError] = useState({});
  const [disabled, setDisabled] = useState(true);

  const fieldsConfig = authconfig[mode]?.options?.[activeRole] || [];

  const { authType } = useParams();
  if (!authType) return <p>Loading...</p>;

  useEffect(() => {
    const type = ["login", "signup"].includes(authType) ? authType : null;
    if (type) setMode(type);
    else window.location.href = "/error/404";
  }, [authType]);

  useEffect(() => {
    const roleToUse = mode === "signup" ? "admin" : activeRole;
    if (activeRole !== roleToUse) setActiveRole(roleToUse);

    const initialFields = (authconfig[mode]?.options?.[roleToUse] || []).reduce(
      (acc, field) => {
        acc[field.name] = "";
        return acc;
      },
      {}
    );

    setError({});
    setDisabled(true);
    setFields(initialFields);
  }, [mode, activeRole]);

  useEffect(() => {
    const hasErrors = Object.values(error).some((e) => e);

    const requiredAccepted =
      mode === "signup" ? state.terms && state.consent : true;

    const allFilled = Object.values(fields).every(
      (val) => val && val.trim() !== ""
    );

    setDisabled(hasErrors || !requiredAccepted || !allFilled);
  }, [error, state, mode, fields]);

  const handleChange = (name) => (e) => {
    const value = e.target.value;
    setFields((prev) => ({ ...prev, [name]: value }));
    clearTimeout(window.validationTimeout);
    window.validationTimeout = setTimeout(() => {
      if (value.trim() !== "") {
        const field = fieldsConfig.find(f => f.name === name);
        if (field) {
          let validate = validateField(field, value, true);
          if (field.name === "confirmPassword" && validate) {
            validate = matchPassword(fields.password, value);
          }
          setError((prev) => ({ ...prev, [name]: !validate }));
        }
      } else {
        setError((prev) => ({ ...prev, [name]: false }));
      }
    }, 1000);
  };

  const handleBlur = (field) => (e) => {
    let validate = validateField(field, e.target.value);

    if (field.name === "confirmPassword" && validate) {
      validate = matchPassword(fields.password, fields.confirmPassword);
    }

    setError((prev) => ({ ...prev, [field.name]: !validate }));
  };

  const handleCheckboxChange = (e) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !fields ||
      Object.values(fields).every((val) => !val || val.trim() === "")
    ) {
      console.warn("Skipping API call: empty fields");
      return;
    }

    try {
      const status = await authenticateUser(mode, activeRole, fields);
      if (status && mode === "signup") {
        setMode("login");
      } else if (status && mode === "login") {
        const prev = document.referrer;
        if (prev.includes("/forgotpassword")) {
          router.replace("/dashboard");
        } else {
          router.back();
        }
      }
    } catch (err) {
      showToast("Authentication failed", "error");
      console.error(err);
    }
  };

  const handleOAuthSubmit = async (providerName) => {
    let provider;

    switch(providerName){
      case 'google':
        provider = googleProvider;
        break;
    }

    const isSuccess= await handleOAuthLogin(provider);
    console.log(isSuccess)
    if (isSuccess) {
      router.back();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-900">
          {authconfig[mode].title}
        </h1>
        <p className="text-sm text-center text-gray-500 mt-2">
          {authconfig[mode].desc}
        </p>

        {/* Role Switcher */}
        <div className="mt-6">
          {roles[mode].length > 1 ? (
            <>
              <p className="text-gray-800 font-medium mb-3 text-center">
                Choose your role
              </p>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {roles[mode].map(({ value, label, icon: Icon }) => {
                  const isActive = activeRole === value;
                  return (
                    <button
                      type="button"
                      key={value}
                      onClick={() => setActiveRole(value)}
                      className={`p-3 sm:p-4 rounded-xl border transition-all duration-200 flex flex-col items-center gap-1
                ${
                  isActive
                    ? "border-blue-500 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isActive ? "text-blue-600" : "text-gray-400"
                        }`}
                      />
                      <span
                        className={`font-semibold text-sm ${
                          isActive ? "text-blue-600" : "text-gray-800"
                        }`}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center gap-2 p-3 sm:p-4 border border-blue-500 bg-blue-50 rounded-xl">
              {(() => {
                const { label, icon: Icon } = roles[mode][0];
                return (
                  <>
                    <Icon className="w-6 h-6 text-blue-600" />
                    <span className="font-semibold text-blue-600">
                      Sign up as {label}
                    </span>
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {/* Form */}
        <div
          style={{
            marginTop: 16,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {fieldsConfig.map((field, idx) => (
            <TextField
              key={idx}
              label={field.label}
              type={field.type || "text"}
              value={fields[field.name] || ""}
              onChange={handleChange(field.name)}
              onBlur={handleBlur(field)}
              error={!!error[field.name]}
              helperText={error[field.name] ? "Invalid value" : ""}
              fullWidth
              size="medium"
              InputLabelProps={field.type === "date" ? { shrink: true } : {}}
            />
          ))}

          {mode === "login" && (
            <Typography align="left" sx={{ fontSize: 13 }}>
              <button
                className="text-blue-600 font-medium hover:underline cursor-pointer"
                onClick={() => router.push("/forgotpassword")}
              >
                Forgot your password?
              </button>
            </Typography>
          )}

          {mode === "signup" && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                py: 2,
              }}
            >
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  name="terms"
                  checked={state.terms}
                  onChange={handleCheckboxChange}
                  style={{ marginRight: 6 }}
                />
                I agree to{" "}
                <a
                  href="/terms"
                  target="_blank"
                  style={{ margin: "0 4px", color: "#1976d2" }}
                >
                  Terms of Service
                </a>
                and
                <a
                  href="/privacy"
                  target="_blank"
                  style={{ margin: "0 4px", color: "#1976d2" }}
                >
                  Privacy Policy
                </a>
              </label>

              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="checkbox"
                  name="consent"
                  checked={state.consent}
                  onChange={handleCheckboxChange}
                  style={{ marginRight: 6 }}
                />
                I consent to the processing of my personal data
              </label>
            </Box>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            variant="contained"
            size="small"
            disabled={disabled}
            sx={{
              mt: 1,
              fontSize: "0.9rem",
              fontWeight: 600,
              textTransform: "none",
              py: 1,
              "&:disabled": { backgroundColor: "#e0e0e0", color: "#9e9e9e" },
            }}
          >
            {mode === "login" ? "Login" : "Sign Up"}
          </Button>

          {mode === "login" && (
            <>
              <Divider textAlign="center" className="text-gray-500">
                or continue with
              </Divider>

              {authconfig.OAuthBtns && (
                <Box sx={{ display: "flex", gap: 4, justifyContent: "center" }}>
                  {authconfig.OAuthBtns.map((btn, idx) => (
                    <Button
                      key={idx}
                      variant={btn.variant}
                      startIcon={btn.icon}
                      sx={btn.style}
                      fullWidth
                      onClick={() => handleOAuthSubmit(btn.name)}
                    >
                      {btn.title}
                    </Button>
                  ))}
                </Box>
              )}
            </>
          )}

          <p className="mt-5 text-center text-sm text-gray-500">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-blue-600 font-medium hover:underline"
            >
              {mode === "login" ? "Register Here" : "Log In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
