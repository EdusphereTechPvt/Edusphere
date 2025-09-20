
import MailIcon from '@mui/icons-material/Mail';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import CampaignIcon from '@mui/icons-material/Campaign';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';


export const ContactUsConfig = {

    title: "Contact Us",
    desc:" Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam, velit.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ducimus tempore sequi facilis esse id nam tempora, explicabo odio quod.",
     cards : [
      {
        icon:MailIcon,
        title: "General Inquiries",
        desc: "For general questions about Edusphere, our services, or partnership opportunities.",
        email: "info@edusphere.com",
        time: "Response within 24 hours"
      },
      {
        icon: HeadsetMicIcon,
        title: "Technical Support",
        desc: "Experiencing technical issues? Our support team is ready to assist you.",
        email: "support@edusphere.com",
        time: "Mon-Fri, 9am-5pm PT"
      },
      {
        icon: CampaignIcon,
        title: "Sales/Demo Requests",
        desc: "Interested in learning more? Request a demo.",
        email: "sales@edusphere.com",
        time: "Response within 48 hours"
      },
      {
        icon: CalendarTodayIcon,
        title: "Billing Questions",
        desc: "For inquiries related to billing, invoices, or payment methods.",
        email: "billing@edusphere.com",
        time: ""
      },
      {
        icon: PhoneIcon,
        title: "Emergency Support",
        desc: "For urgent issues requiring immediate attention.",
        email: "emergency@edusphere.com",
        time: ""
      }
    ],
    styles:{
      cardStyle:{
        inlineStyle: {alignItems: 'flex-start', gap: '1rem'},
      },
      textContainerStyle:{
        inlineStyle:{ textAlign: 'start' },
        titleStyle:{
          inlineStyle:{ fontSize: '1.25rem', fontWeight: '600', color: '#333' },
          className:"text-lg font-semibold text-gray-900"
        },
        descStyle:{
          inlineStyle:{ fontSize: '1rem', color: '#666', marginTop: '0.5rem' },
          className:"text-sm text-gray-500 mt-2"
        },
        additionalInfoStyle:{
          inlineStyle:{},
          className:"text-sm text-gray-500",
          email:{
            inlineStyle:{ fontSize: '0.875rem', color: 'blue', marginTop: '4px' },
            className:"text-sm text-blue-500"
          },
          time:{
            inlineStyle:{ fontSize: '0.75rem', color: 'gray', marginTop: '2px' },
            className:"text-xs text-gray-400"
          }
        }
      }
    }
}