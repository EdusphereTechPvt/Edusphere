import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import FlagIcon from "@mui/icons-material/Flag";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SchoolIcon from "@mui/icons-material/School";
import PsychologyIcon from "@mui/icons-material/Psychology";

export default function StorySection() {
  const timelineData = [
    { icon: <FlagIcon />, year: "2015", title: "Founded Edusphere", subtitle: "The journey begins with a shared vision." },
    { icon: <RocketLaunchIcon />, year: "2017", title: "Launched our flagship product", subtitle: "Bringing our first major innovation to schools." },
    { icon: <SchoolIcon />, year: "2020", title: "Expanded to over 1000 schools", subtitle: "Gaining trust and momentum across the nation." },
    { icon: <PsychologyIcon />, year: "2023", title: "Introduced AI-powered tools", subtitle: "Pioneering the future of personalized learning." },
  ];

  return (
    <section className="w-full py-24 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 px-8 max-w-6xl mx-auto">

        <div>
          <h2 className="text-3xl font-bold mb-4 text-black">Our Story</h2>
          <p className="text-gray-600 leading-relaxed max-w-md">
            Edusphere was founded in 2015 by a group of educators and technology
            enthusiasts who recognized the need for more effective and engaging
            educational tools. Starting as a small project, we quickly grew into
            a leading provider of educational technology solutions, driven by our
            passion for improving student outcomes and supporting teachers.
          </p>
        </div>

        <div>
          <Timeline
            position="right"
            sx={{
              p: 0,
              m: 0,
              "& .MuiTimelineItem-root:before": { flex: 0, p: 0 },
            }}
          >
            {timelineData.map((item, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot color="primary">{item.icon}</TimelineDot>
                  {index < timelineData.length - 1 && <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <h3 className="font-semibold text-black">
                    {item.year} - {item.title}
                  </h3>
                  <p className="text-gray-600">{item.subtitle}</p>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>
    </section>
  );
}
