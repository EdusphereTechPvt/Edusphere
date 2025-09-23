export const PricingConfig = {
  title: "Simple, Transperent Pricing for Every School",
  desc: " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, velit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ducimus tempore sequi facilis esse id nam tempora, explicabo odio quod.",

  cards: [
    {
      title: "Starter",
      monthly: {
        price: "$0",
        desc: "For small schools or to try out our platform monthly.",
        features: [
          { feature: "Up to 50 Students" },
          { feature: "Basic Attendance" },
          { feature: "Manual Gradebook" },
          { feature: "100 SMS Credits" },
        ],
        button: "Get Started",
      },
      annual: {
        price: "$0",
        desc: "For small schools or to try out our platform annually.",
        features: [
          { feature: "Up to 50 Students" },
          { feature: "Basic Attendance" },
          { feature: "Manual Gradebook" },
          { feature: "100 SMS Credits" },
        ],
        button: "Get Started",
      },
    },
    {
      title: "Pro",
      monthly: {
        price: "$99",
        desc: "Monthly plan for growing schools with extra features.",
        features: [
          { feature: "Unlimited Students" },
          { feature: "RFID Attendance" },
          { feature: "Advanced Fee Management + Payment Gateway" },
          { feature: "Bulk SMS & Notifications" },
          { feature: "Priority Email & Chat Support" },
        ],
        button: "Start Free Trial",
      },
      annual: {
        price: "$999", // discounted annual price
        desc: "Annual plan for growing schools with 2 months free!",
        features: [
          { feature: "Unlimited Students" },
          { feature: "RFID Attendance" },
          { feature: "Advanced Fee Management + Payment Gateway" },
          { feature: "Bulk SMS & Notifications" },
          { feature: "Priority Email & Chat Support" },
        ],
        button: "Start Free Trial",
      },
    },
    {
      title: "Enterprise",
      monthly: {
        price: "Custom",
        desc: "Custom monthly solutions for large schools or districts.",
        features: [
          { feature: "White-Labeling" },
          { feature: "Custom API Access" },
          { feature: "Dedicated Account Manager" },
          { feature: "Onboarding & Training" },
          { feature: "Unlimited Everything" },
        ],
        button: "Contact Sales",
      },
      annual: {
        price: "Custom",
        desc: "Custom annual solutions for large schools or districts.",
        features: [
          { feature: "White-Labeling" },
          { feature: "Custom API Access" },
          { feature: "Dedicated Account Manager" },
          { feature: "Onboarding & Training" },
          { feature: "Unlimited Everything" },
        ],
        button: "Contact Sales",
      },
    },
  ],

  table: {
    title: "Detailed Feature Comparison",
    headers: ["Feature", "Starter", "Pro", "Enterprise"],

    data: [
      {
        Feature: "Student Management",
        Starter: "Up to 50",
        Pro: "Unlimited",
        Enterprise: "Unlimited",
      },
      {
        Feature: "Attendance Tracking",
        Starter: "Basic",
        Pro: "RFID",
        Enterprise: "RFID",
      },
      {
        Feature: "Gradebook",
        Starter: "Manual",
        Pro: "Advanced",
        Enterprise: "Advanced",
      },
      {
        Feature: "Fee Management",
        Starter: "Basic",
        Pro: "Advanced + Gateway",
        Enterprise: "Advanced + Gateway",
      },
      {
        Feature: "Customization",
        Starter: "–",
        Pro: "–",
        Enterprise: "White-Labeling",
      },
      {
        Feature: "Support",
        Starter: "Email",
        Pro: "Priority Email & Chat",
        Enterprise: "Dedicated Account Manager",
      },
    ],
  },

  tableTitle: "Detailed Feature Comparison",
  schoolTitle: "Trusted by 500+ Schools",
  schoolDesc:
    "Join a growing community of innovative schools transforming their administration",
  schoolLogos: [
    "https://t4.ftcdn.net/jpg/04/91/76/63/360_F_491766301_yF6pxwvJnyY4I43PlU6zPEPoY5ZjJLEL.jpg",
    "https://t4.ftcdn.net/jpg/02/38/94/05/360_F_238940516_0BihE7YocY9vpgClPDDWuuaLneDwxtWn.jpg",
    "https://static.vecteezy.com/system/resources/previews/046/006/102/non_2x/education-logo-design-template-for-school-and-organization-vector.jpg",
    "https://static.vecteezy.com/system/resources/previews/046/006/102/non_2x/education-logo-design-template-for-school-and-organization-vector.jpg",
    "https://static.vecteezy.com/system/resources/previews/046/006/102/non_2x/education-logo-design-template-for-school-and-organization-vector.jpg",
    "https://static.vecteezy.com/system/resources/previews/046/006/102/non_2x/education-logo-design-template-for-school-and-organization-vector.jpg",
    "https://static.vecteezy.com/system/resources/thumbnails/008/040/410/small_2x/school-logo-design-template-free-vector.jpg",
  ],

  principalFeedBack:
    "Edusphere has transformed our school's efficiency. The attendance tracking and communication tools have saved us countless hours.",
  principal: "Sarah Chen",
  principalDesc: "Principal at Lakeside High",

  frequentQuestions: {
    title: "Frequently Asked Questions",
    styles: {
      titleStyle: {
        inlineStyle: {
          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem", lg: "1.3rem" },
          fontWeight: "bold",
        },
      },
    },
    items: [
      {
        type: "accordion",
        styles: {
          inlineStyle: {
            // width:"80%"
          },
        },
        values: [
          {
            title: "Can I change my plan Later ?",
            desc: "Yes, You can upgrade or downgrade your plan at any time from your account settings.",
            styles: {
              titleStyle: {},
              descStyle: {},
            },
          },
          {
            title: "Do you Offer Discounts for non-profits ?",
            desc: "Yes, We offer special pricing for non-profit organizations. Please contact our sales team for more details.",
            styles: {
              titleStyle: {},
              descStyle: {},
            },
          },
          {
            title: "What is your refund policy ?",
            desc: "We offer a 30-day money-back guarantee on all our paid plans. If you're not satisfied, contact support for a full refund.",
            styles: {
              titleStyle: {},
              descStyle: {},
            },
          },
        ],
      },
    ],
  },

  transformSchool: {
    title: "Ready to Transform Your School ?",
    desc: "Start your journey with Edusphere today and see the difference",
    button: "Start Your Free 14-Day Trial Today !",
  },
};
