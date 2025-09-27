import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { Facebook, Google, Mail } from "@mui/icons-material";


export const roles = {
  login: [
    { value: "admin", label: "Admin", icon: AdminPanelSettingsIcon },
    { value: "teacher", label: "Teacher", icon: SchoolIcon },
    { value: "parent", label: "Parent", icon: GroupIcon },
    { value: "student", label: "Student", icon: PersonIcon },
  ],
  signup: [{ value: "admin", label: "Admin", icon: AdminPanelSettingsIcon }],
};


export const authconfig = {
  login: {
    title: "Welcome Back to Edusphere",
    desc: "Log in to access your account",
    options: {
      admin: [
        {
          name: "uidOrEmail",
          label: "Email or Username",
          type: "email | text",
          required: true,
          minLength: 5,
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          required: true,
          minLength: 8,
        },
      ],
      teacher: [
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
          minLength: 5,
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          required: true,
          minLength: 8,
        },
      ],
      parent: [
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
          minLength: 5,
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          required: true,
          minLength: 8,
        },
      ],
      student: [
        {
          name: "email",
          label: "Email",
          type: "email",
          required: true,
          minLength: 5,
        },
        {
          name: "password",
          label: "Password",
          type: "password",
          required: true,
          minLength: 8,
        },
      ],
    },
  },
  signup: {
    title: "Create Your Account",
    desc: "Sign up to get started",
    options: {
      admin: [
        {
          name: "fullName",
          label: "Full Name",
          type: "text",
          required: true,
        },
        {
          name: "dob",
          label: "Date of Birth",
          type: "date",
          required: true,
        },
        { name: "email", label: "Email", type: "email", required: true },
        {
          name: "password",
          label: "Password",
          type: "password",
          required: true,
          minLength: 8,
        },
        {
          name: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          required: true,
          minLength: 8,
        },
        {
          name: "inviteToken",
          label: "Invite Token",
          type: "text",
          required: true,
          minLength: 8,
        }
      ],
    },
  },
  OAuthBtns: [
    {
      name: "google",
      variant: "contained",
      icon: <Google />,
      title: "Google",
      style: {
        mt: 1,
        backgroundColor: "#fff",
        color: "#000",
        fontSize: "0.9rem",
        fontWeight: 600,
        textTransform: "none",
        py: 1,
        "&:hover": { backgroundColor: "#f0f0f0" },
      },

    },
    {
      name: "facebook",
      variant: "contained",
      icon: <Facebook />,
      title: "Facebook",
      style: {
        mt: 1,
        backgroundColor: "#fff",
        color: "#000",
        fontSize: "0.9rem",
        fontWeight: 600,
        textTransform: "none",
        py: 1,
        "&:hover": { backgroundColor: "#f0f0f0" },
      },

    },
  ],
  forgotPassword: {
    fields: [
      { name: "email", label: "Email Address", type: "email", required: true, icon: Mail },
    ],
    styles: {

      container: "min-h-screen flex items-center justify-center bg-gray-100 p-6",
      form: "bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6",
      title: "text-2xl font-bold text-center text-gray-800",
      inputGroup: "flex items-center border border-gray-300 rounded-lg px-3 py-2",
      icon: "w-5 h-5 text-gray-500 mr-2",
      input: "w-full outline-none bg-transparent text-gray-700 placeholder-gray-400",
      button:
      "w-full bg-blue-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300",
      link: "text-sm text-blue-600 hover:underline text-center block",
    }
  },
  changePass: {
    fields: [
      {
          name: "password",
          label: "Password",
          type: "password",
          required: true,
          minLength: 8,
        },
        {
          name: "confirmPassword",
          label: "Confirm Password",
          type: "password",
          required: true,
          minLength: 8,
        },
    ],
    styles: {
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
        `p-3 sm:p-4 rounded-xl border transition-all duration-200 flex flex-col items-start gap-1 ${active
          ? "border-blue-500 bg-blue-50 shadow-md"
          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
        }`,
      roleIcon: (active) =>
        `w-6 h-6 ${active ? "text-blue-600" : "text-gray-400"}`,
      roleText: (active) =>
        `font-semibold text-sm ${active ? "text-blue-600" : "text-gray-800"}`,
      roleDesc: "text-xs text-gray-500",
    }
  }
};