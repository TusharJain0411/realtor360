"use client";

import { useState } from "react";


import DashboardStats from "./DashboardStats";
import DealsByLeadSource from "./DealsByLeadSource";
import DealsByStages from "./DealsByStages";
import DealsBySalesPeople from "./DealsBySalesPeople";
import TotalDealsClosed from "./TotalDealsClosed";
import DealsInPipeline from "./DealsInPipeline";
import ActiveListing from "./ActiveListing";
import LeadsContacts from "./LeadsContacts";


import Reminder from "./Reminder";
import CalendarSchedule from "./CalendarSchedule";

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<"dashboard" | "reminder">(
    "dashboard",
  );

  return (
    <div className="min-h-[calc(100vh-65px)] w-full bg-[var(--background)] pb-6 ">
      <div className="fixed left-1/2 top-[75px] z-40 -translate-x-1/2 min-[900px]:hidden">
        <div className="flex items-center rounded-full border border-[var(--border)] bg-[var(--background-white)] p-1 shadow-[var(--card-shadow)]">
          {/* Overview Button */}
          <button
            type="button"
            onClick={() => setActiveSection("dashboard")}
            className={`rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-300 ${
              activeSection === "dashboard"
                ? "bg-[var(--primary)] text-[var(--text-white)] shadow-sm"
                : "text-[var(--text-secondary)] hover:bg-[var(--background-muted)]"
            }`}
          >
            Overview
          </button>

          {/* Activity Button */}
          <button
            type="button"
            onClick={() => setActiveSection("reminder")}
            className={`rounded-full px-5 py-2 text-[13px] font-medium transition-all duration-300 ${
              activeSection === "reminder"
                ? "bg-[var(--primary)] text-[var(--text-white)] shadow-sm"
                : "text-[var(--text-secondary)] hover:bg-[var(--background-muted)]"
            }`}
          >
            Activity
          </button>
        </div>
      </div>

      {/* Main Dashboard Layout */}
      <div className="flex w-full flex-col pt-[70px] min-[900px]:flex-row min-[900px]:pt-0">
        {/* Left Section  */}
        <section
          className={`w-full px-4 pt-4 min-[900px]:w-[75%] min-[900px]:pr-0 ${
            activeSection === "dashboard" ? "block" : "hidden min-[900px]:block"
          }`}
        >
          {/* Dashboard Statistics */}
          <DashboardStats />

          {/* Charts */}
          <div className="charts mt-4 grid w-full grid-cols-1 gap-2 min-[800px]:gap-3 md:grid-cols-2">
            <DealsByLeadSource />
            <DealsByStages />
          </div>

          {/* Deals Section */}
          <div className="deals mt-4 grid w-full grid-cols-1 gap-3 md:grid-cols-2">
            {/* Left Column */}
            <div className="flex min-w-0 flex-col gap-2 min-[800px]:gap-3">
              <DealsBySalesPeople />
              <TotalDealsClosed />
            </div>

            {/* Right Column */}
            <div className="min-w-0">
              <DealsInPipeline />
            </div>
          </div>

          {/* Properties and Leads */}
          <div className="listings mt-4 grid w-full grid-cols-1 gap-2 min-[800px]:grid-cols-[minmax(0,3fr)_minmax(0,1fr)] min-[800px]:gap-3">
            {/* Active Listings */}
            <div className="min-w-0">
              <ActiveListing />
            </div>

            {/* Leads Contacts */}
            <div className="min-w-0">
              <LeadsContacts />
            </div>
          </div>
        </section>

        {/* Right Section */}

        {/* Right Section - 25% */}
        <aside
          className={`w-full min-w-0 p-4 min-[900px]:w-[25%] ${
            activeSection === "reminder" ? "block" : "hidden min-[900px]:block"
          }`}
        >
          <div className="flex w-full min-w-0 flex-col gap-4">
            {/* Reminder - Top */}
            <div className="w-full min-w-0">
              <Reminder />
            </div>

            {/* Calendar Schedule - Below Reminder */}
            <div className="w-full min-w-0">
              <CalendarSchedule />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
