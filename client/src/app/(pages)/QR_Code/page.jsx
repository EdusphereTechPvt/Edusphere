import QRCodeManagement from "@/app/components/QRCodeManagement/QRCodeManagement";
import SystemOverview from "@/app/components/QRCodeManagement/systemoverview";

export default function Page() {
  const qrDataFromBackend = JSON.stringify({
    session: "Math Grade 8A Period 3",
    duration: "15 minutes",
    issuedAt: new Date().toISOString(),
  });

  return (
    <div className="p-6 space-y-10">
      {/* QR Code Management Section */}
      <div className="flex justify-center">
        <QRCodeManagement qrData={qrDataFromBackend} />
      </div>

      {/* System Overview Section */}
      <SystemOverview />
    </div>
  );
}
