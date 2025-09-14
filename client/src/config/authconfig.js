import { Shield, GraduationCap, User, Users } from "lucide-react";

export const roles = [
  { name: "Admin", description: "Manage settings & users.", icon: Shield },
  { name: "Teacher", description: "Manage courses & classes.", icon: GraduationCap },
  { name: "Student", description: "Access courses & track progress.", icon: User },
  { name: "Parent", description: "Monitor child's performance.", icon: Users },
];

export const styles = {
  container: "min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8",
  card: "w-full max-w-lg bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-8",
  heading: "text-2xl sm:text-3xl font-bold text-center text-gray-900",
  subHeading: "text-sm text-center text-gray-500 mt-2",
  roleTitle: "text-gray-800 font-medium mb-3 text-center",
  roleGrid: "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3",
  roleBtn: (active) =>
    `p-3 sm:p-4 rounded-xl border transition-all duration-200 flex flex-col items-start gap-1 ${
      active ? "border-blue-500 bg-blue-50 shadow-md" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
    }`,
  roleIcon: (active) => `${active ? "text-blue-600" : "text-gray-400"} w-5 h-5`,
  roleText: (active) => `font-semibold text-sm ${active ? "text-blue-600" : "text-gray-800"}`,
  roleDesc: "text-xs text-gray-500",
  inputWrapper: "relative",
  inputIcon: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5",
  input: "w-full pl-10 pr-4 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none transition",
  passwordToggle: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition",
  optionsWrapper: "flex flex-col sm:flex-row items-center justify-between text-sm gap-2",
  rememberLabel: "flex items-center gap-2 text-gray-700",
  rememberBox: "rounded border-gray-300",
  forgotLink: "text-blue-600 hover:underline",
  submitBtn: "w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition",
  registerText: "mt-5 text-center text-sm text-gray-500",
  registerLink: "text-blue-600 font-medium hover:underline",
};
