"use client";

import FeeBreakdownTable from "./FeeBreakdownTable";
import PaymentHistoryTable from "./PaymentHistoryTable";
import FeeStatusOverview from "./FeeStatusOverview";
import SchedulePaymentsReminders from "./SchedulePaymentsReminders";

export default function Page() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Fee Overview Section */}
        <div className="mt-8">
          <FeeStatusOverview />
        </div>

        {/* Fee Breakdown Section */}
        <div className="mt-8">
          <FeeBreakdownTable />
        </div>

        {/* Payment History and Schedule Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <PaymentHistoryTable />
          </div>

          
        </div>
        <div className="md:col-span-1">
            <h2 className="text-lg font-semibold mb-3 text-gray-700">
              Scheduled Payments & Reminders
            </h2>
            <SchedulePaymentsReminders />
          </div>
      </div>
    </main>
  );
}
