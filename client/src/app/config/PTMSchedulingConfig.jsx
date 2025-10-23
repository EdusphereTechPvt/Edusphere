export const PTMSchedulingConfig = {
    page: {
        title: "PTM Scheduling",
        subtitle: "Manage and schedule Parent-Teacher Meetings efficiently.",
    },

    stats: [
        {
            title: "Total Scheduled Meetings",
            value: "250",
        },
        {
            title: "Upcoming Sessions",
            value: "30"
        },
        {
            title: "Participation Rate",
            value: "95%"
        }
    ],

    sections: [
        {
            title: 'Basic Setup',
            desc: 'Configure the basic details of the PTM, including title, description, date, duration, format (in-person or virtual), and purpose.'
        },
        {
            title: 'Scheduling Options',
        },
        {
            title: 'Participant Management',
        },
        {
            title: 'Time Slot Management',
        },
        {
            title: 'Room & Resource Management',
        },
        {
            title: 'Notification & Reminder System',
        }
    ],

    styles: {
        page: "bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen py-8",
        container: "max-w-7xl mx-auto px-8",
        title: "text-xl xs:text-base lg:text-2xl font-bold mb-2 text-gray-900 text-left",
        subtitle: "text-[0.7rem] md:text-base text-gray-500 text-left mb-6",
        statsGrid: "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8",
        mainGrid: "flex flex-col lg:flex-row gap-8",
        calendarSection: "bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg p-6 shadow-lg",
        calendarTitle: "text-[0.9] font-bold text-slate-900 mb-4 text-left",
        calendarContainer: "flex justify-center w-full p-4 min-h-fit",
        wizardSection: "bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg p-6 shadow-lg",
        wizardTitle: "text-[0.9] font-bold text-slate-900 mb-4",
    }
};

export default PTMSchedulingConfig;
