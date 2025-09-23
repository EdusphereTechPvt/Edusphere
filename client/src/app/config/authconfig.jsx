import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import { Facebook, Google } from "@mui/icons-material";


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
        name:"dob",
        label:"Date of Birth",
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
};

