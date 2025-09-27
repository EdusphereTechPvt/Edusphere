import SubjectBreakdown from "./SubjectBreakdown";
import AttendanceStats from "./AttendanceStats";
import AttendanceLog from "./AttendanceLog"; // ✅ import your new component

export default function Page() {
  const subjects = [
    { name: "Mathematics", percentage: 90 },
    { name: "English Literature", percentage: 95 },
    { name: "Physics", percentage: 85 },
  ];

  return (
    <>
      <SubjectBreakdown subjects={subjects} />
      <main style={{ padding: "2rem" }}>
        <h1>Dashboard</h1>
        <AttendanceStats />
        <AttendanceLog /> {/* ✅ render it here */}
      </main>
    </>
  );
}