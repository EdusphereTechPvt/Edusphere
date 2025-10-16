const faqconfig = {
    title: "Help center",
    subtitle: "Find answers to common questions about Edusphere.",
    tabs: [
        {
            name: "Account Management",
            items: [],
        },
        {
            name: "Feature & Functionality",
            items: [],
        },
        {
            name: "Billing & Pricing",
            items: [],
        },
        {
            name: "Technical Support",
            items: [],
        },
        {
            name: "Privacy & Security",
            items: [],
        },
        {
            name: "School Administration",
            items: [],
        },
    ],
};
export const PTMConfig = {
  type: "accordion",
  styles: {
    inlineStyle: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px"
    }
  },
  values: [
    
    {
      title: "Basic Setup",
      desc: "Configure the basic details of the PTM, including title, description, date, duration, format (in-person or virtual), and purpose."
    },
    {
      title: "Scheduling Options",
      desc: "Manage all scheduling-related configurations for your PTM sessions."
    },
    {
      title: "Participant Management",
      desc: "Add, remove, and manage participants for your PTM sessions."
    },
    {
      title: "Time Slot Management",
      desc: "Set and manage available time slots for meetings and appointments."
    },
    {
      title: "Room & Resource Management",
      desc: "Assign and manage rooms, equipment, and other resources for your PTM sessions."
    },
    {
      title: "Notification & Reminder System",
      desc: "Configure automated notifications and reminders for participants and organizers."
    }
  ]
};
export default faqconfig;