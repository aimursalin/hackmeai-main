"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const CalendarDay: React.FC<{ day: number | string; isHeader?: boolean }> = ({
  day,
  isHeader,
}) => {
  const randomBgWhite =
    !isHeader && Math.random() < 0.3
      ? "bg-indigo-500 text-white "
      : "text-text-tertiary";

  return (
    <div
      className={`col-span-1 row-span-1 flex h-8 w-8 items-center justify-center ${
        isHeader ? "" : "rounded-xl"
      } ${randomBgWhite}`}
    >
      <span className={`font-medium ${isHeader ? "text-xs" : "text-sm text-foreground/70"}`}>
        {day}
      </span>
    </div>
  );
};

export function Calendar() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1);
  const firstDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = new Date(
    currentYear,
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const bookingLink = `https://cal.com/aliimam/designali`;

  const renderCalendarDays = () => {
    let days: React.ReactNode[] = [
      ...dayNames.map((day, i) => (
        <CalendarDay key={`header-${day}`} day={day} isHeader />
      )),
      ...Array(firstDayOfWeek).fill(null).map((_, i) => (
        <div
          key={`empty-start-${i}`}
          className="col-span-1 row-span-1 h-8 w-8"
        />
      )),
      ...Array(daysInMonth)
        .fill(null)
        .map((_, i) => <CalendarDay key={`date-${i + 1}`} day={i + 1} />),
    ];

    return days;
  };

  return (
    <section className="mx-auto max-w-5xl px-6 mb-24">
      <BentoCard height="h-auto" linkTo={bookingLink}>
        <div className="grid h-full lg:grid-cols-2 gap-10 items-center">
          <div className="text-left">
            <h2 className="mb-4 text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              Any questions about Design?
            </h2>
            <p className="mb-6 text-lg text-muted-foreground max-w-md">
              Feel free to reach out to me! Whether it's strategy, execution, or just a quick chat.
            </p>
            <Button className="mt-3 rounded-2xl h-12 px-8 text-base font-semibold" variant="superior">
              Book Now
            </Button>
          </div>
          <div className="flex justify-center lg:justify-end transition-all duration-500 ease-out">
            <div className="w-full max-w-[400px]">
              <div className="h-full rounded-[24px] border border-white/10 bg-black/40 backdrop-blur-xl p-2 transition-colors duration-100 group-hover:border-indigo-400/50">
                <div
                  className="h-full rounded-2xl border-2 border-white/5 p-4"
                  style={{ boxShadow: "0px 4px 20px rgba(0,0,0,0.5)" }}
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">
                          {currentMonth}, {currentYear}
                        </span>
                      </p>
                      <span className="h-1 w-1 rounded-full bg-indigo-500">&nbsp;</span>
                      <p className="text-xs text-muted-foreground">30 min call</p>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-7 gap-2">
                    {renderCalendarDays()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </BentoCard>
    </section>
  );
}

interface BentoCardProps {
  children: React.ReactNode;
  height?: string;
  rowSpan?: number;
  colSpan?: number;
  className?: string;
  showHoverGradient?: boolean;
  linkTo?: string;
}

export function BentoCard({
  children,
  height = "h-auto",
  className = "",
  showHoverGradient = true,
  linkTo,
}: BentoCardProps) {
  const cardContent = (
    <div
      className={`group relative flex flex-col rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-12 hover:bg-indigo-500/[0.05] transition-all duration-500 ease-in-out ${height} ${className} overflow-hidden`}
    >
      {linkTo && (
        <div className="absolute bottom-6 right-8 z-[999] flex h-14 w-14 rotate-6 items-center justify-center rounded-full bg-white shadow-xl opacity-0 transition-all duration-300 ease-in-out group-hover:translate-y-[-8px] group-hover:rotate-0 group-hover:opacity-100">
          <svg
            className="h-7 w-7 text-indigo-600"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M17.25 15.25V6.75H8.75"
            ></path>
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M17 7L6.75 17.25"
            ></path>
          </svg>
        </div>
      )}
      {showHoverGradient && (
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.15),transparent_70%)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );

  if (linkTo) {
    return (
      <a
        href={linkTo}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {cardContent}
      </a>
    );
  }

  return cardContent;
}
