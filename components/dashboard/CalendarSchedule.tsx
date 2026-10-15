"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type EventType = "visit" | "followup" | "offer";

interface ScheduleEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  type: EventType;
}

const scheduleEvents: ScheduleEvent[] = [
  {
    id: 1,
    title: "Visit Client- Angel Plaza",
    description: "Sector 45, Gurugram, Haryana",
    date: "2026-10-10",
    type: "visit",
  },
  {
    id: 2,
    title: "Visit Client – Site Walkthrough",
    description: "Whitefield Road, Bengaluru, Karnataka",
    date: "2026-10-10",
    type: "visit",
  },
  {
    id: 3,
    title: "Follow Up – Jessica Chen",
    description: "jessica.chen@email.com",
    date: "2026-10-14",
    type: "followup",
  },
  {
    id: 4,
    title: "Follow Up – Roger Bouchard",
    description: "roger.bouchard@clientmail.com",
    date: "2026-10-14",
    type: "followup",
  },
  {
    id: 5,
    title: "Submit Final Offer – Villa Deal",
    description: "Finalize and send offer documents.",
    date: "2026-10-11",
    type: "offer",
  },
  {
    id: 6,
    title: "Submit Internal Review – Apartment",
    description: "Update CRM with latest market rates.",
    date: "2026-10-11",
    type: "offer",
  },
];

const eventColors: Record<EventType, string> = {
  visit: "var(--success)",
  followup: "#ed8bae",
  offer: "#f4c400",
};

const weekDays = ["S", "M", "T", "W", "T", "F", "S"];

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

export default function CalendarSchedule() {
  const [currentMonth, setCurrentMonth] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [todayString, setTodayString] = useState<string>("");

  // Initialize current date only on the client
  useEffect(() => {
    const today = new Date();

    const formattedToday = formatDate(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

    setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));

    setSelectedDate(formattedToday);
    setTodayString(formattedToday);
  }, []);

  // Prevent rendering until date is initialized
  if (!currentMonth) {
    return null;
  }

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const changeMonth = (direction: number) => {
    const newMonth = new Date(year, month + direction, 1);

    setCurrentMonth(newMonth);
  };

  const monthTitle = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const selectedEvents = scheduleEvents.filter(
    (event) => event.date === selectedDate,
  );

  const displayedEvents =
    selectedEvents.length > 0
      ? selectedEvents
      : scheduleEvents.filter((event) => {
          const [eventYear, eventMonth] = event.date.split("-").map(Number);

          return eventYear === year && eventMonth === month + 1;
        });

  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-[var(--radius-lg)] bg-[var(--background-white)] shadow-[var(--card-shadow)] px-4 py-6">
      {/* Calendar */}
      <div className="pb-8">
        {/* Month Header */}
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-[28px] font-medium text-[var(--text-primary)] max-[900px]:text-[24px]">
            {monthTitle}
          </h2>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => changeMonth(-1)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-primary)] transition-colors hover:bg-[var(--background-muted)]"
            >
              <ChevronLeft size={30} strokeWidth={3} />
            </button>

            <button
              type="button"
              aria-label="Next month"
              onClick={() => changeMonth(1)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-primary)] transition-colors hover:bg-[var(--background-muted)]"
            >
              <ChevronRight size={30} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Weekday Headers */}
        <div className="mt-8 grid grid-cols-7 gap-y-3">
          {weekDays.map((day, index) => (
            <div
              key={index}
              className="flex h-8 items-center justify-center text-[14px] font-medium text-[var(--text-primary)]"
            >
              {day}
            </div>
          ))}

          {/* Calendar Dates */}
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} />;
            }

            const dateString = formatDate(year, month, day);

            const isToday = dateString === todayString;
            const isSelected = selectedDate === dateString;

            const dayEvents = scheduleEvents.filter(
              (event) => event.date === dateString,
            );

            return (
              <button
                key={dateString}
                type="button"
                onClick={() => setSelectedDate(dateString)}
                className="relative flex h-[35px] flex-col items-center justify-start"
              >
                <span
                  className={`flex h-[27px] w-[27px] items-center justify-center rounded-[5px] text-[14px] transition-colors ${
                    isSelected
                      ? "bg-[var(--primary)] font-semibold text-[var(--text-primary)]"
                      : isToday
                        ? "border border-[var(--primary)] font-semibold text-[var(--primary)]"
                        : "text-[var(--text-primary)] hover:bg-[var(--background-muted)]"
                  }`}
                >
                  {day}
                </span>

                {/* Event Indicators */}
                {dayEvents.length > 0 && (
                  <div className="absolute bottom-0 flex items-center gap-[2px]">
                    {Array.from(
                      new Set(dayEvents.map((event) => event.type)),
                    ).map((type) => (
                      <span
                        key={type}
                        className="h-[3px] w-[15px] rounded-full"
                        style={{
                          backgroundColor: eventColors[type],
                        }}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)]" />

      {/* Schedule */}
      <div className="flex min-h-0 flex-1 flex-col mt-8">
        <h3 className="mb-5 text-[20px] font-medium text-[var(--text-primary)]">
          My Schedule
        </h3>

        <div className="flex min-h-0 flex-col gap-4 overflow-y-auto pr-1">
          {displayedEvents.length > 0 ? (
            displayedEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-l-[16px] border-l-[3px] px-3 py-3 transition-colors hover:bg-[var(--background-muted)]"
                style={{
                  borderLeftColor: eventColors[event.type],
                }}
              >
                <h4 className="text-[16px] font-medium leading-snug text-[var(--text-primary)]">
                  {event.title}
                </h4>

                <p className="mt-1 text-[13px] leading-snug text-[var(--text-secondary)]">
                  {event.description}
                </p>
              </div>
            ))
          ) : (
            <p className="py-5 text-center text-[var(--text-muted)]">
              No scheduled activities for this month.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
