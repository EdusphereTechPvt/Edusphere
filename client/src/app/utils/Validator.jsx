import { showToast } from "./Toast";

export const validateField = (field,value) => {
    let error;
    if (field.required && !value) {
        error = `${field.label} is required`;
    } else if (field.minLength && value.length < field.minLength) {
        error = `${field.label} must be at least ${field.minLength} characters`;
    }
    else if (field.type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            error = "Invalid email address";
        }
    }
    else if (field.type === "password") {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(value)) {
            error = "Password must contain uppercase, lowercase, number, special char";
        }
    }
    showToast(error, "error");
    return error === undefined;
}

export const matchPassword = (pass, confirmPass) => {
    if (pass !== confirmPass) {
      showToast("Passwords do not match", "error");
      return false;
    }
    return true;
  };
