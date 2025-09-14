export const styles = {
  container: "min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8",
  card: "w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8",

  heading: "text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2",
  subHeading: "text-sm text-center text-gray-500 mb-6",
  roleTitle: "text-gray-800 font-medium mb-3 text-center",

  // Inputs
  inputWrapper: "relative mb-4",
  inputIcon: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5",
  input: "w-full pl-10 pr-10 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none transition",

  // Password toggle
  passwordToggle: "absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition",

  // Labels
  label: "block text-sm font-medium text-gray-700 mb-1",

  // Buttons
  button: "w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition",
  backButton: "w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition",
  googleBtn: "w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-3 hover:bg-gray-50 transition",

  // Options row (remember me + forgot link)
  optionsWrapper: "flex flex-col sm:flex-row items-center justify-between text-sm gap-2 mb-4",
  rememberLabel: "flex items-center gap-2 text-gray-700",
  rememberBox: "rounded border-gray-300",
  forgotLink: "text-blue-600 hover:underline",

  // Divider
  divider: "flex items-center my-6",
  dividerLine: "flex-grow h-px bg-gray-300",
  dividerText: "mx-3 text-gray-400 text-sm",

  // Register text
  registerText: "mt-5 text-center text-sm text-gray-500",
  registerLink: "text-blue-600 font-medium hover:underline",

  // Role buttons
  roleBtn: (active) =>
    `p-3 sm:p-4 rounded-xl border transition-all duration-200 flex flex-col items-start gap-1 ${
      active
        ? "border-blue-500 bg-blue-50 shadow-md"
        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
    }`,
  roleIcon: (active) =>
    `w-6 h-6 ${active ? "text-blue-600" : "text-gray-400"}`,
  roleText: (active) =>
    `font-semibold text-sm ${active ? "text-blue-600" : "text-gray-800"}`,
  roleDesc: "text-xs text-gray-500",
};
