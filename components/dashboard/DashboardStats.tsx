import {
  House,
  UserRound,
  Handshake,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    id: 1,
    title: "Active Listing",
    value: "23",
    change: "-12%",
    trend: "down",
    icon: House,
  },
  {
    id: 2,
    title: "Active Leads",
    value: "120",
    change: "+12%",
    trend: "up",
    icon: UserRound,
  },
  {
    id: 3,
    title: "Total Closed",
    value: "42",
    change: "+12%",
    trend: "up",
    icon: Handshake,
  },
  {
    id: 4,
    title: "Total Revenue",
    value: "Rs.22Cr.",
    change: "+12%",
    trend: "up",
    icon: Coins,
  },
];

export default function DashboardStats() {
  return (
    <div className="grid w-full grid-cols-2 gap-2 min-[800px]:grid-cols-4 min-[800px]:gap-3">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.trend === "up";

        return (
          <div
            key={stat.id}
            className="flex min-w-0 flex-col justify-between rounded-[20px] bg-[var(--background-white)] px-4 py-3 shadow-[var(--card-shadow)]"
          >

            <div className="flex items-center gap-4">
              <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[var(--background)]">
                <Icon
                  size={25}
                  strokeWidth={2.5}
                  className="text-[var(--primary)]"
                />
              </div>

              <h3 className=" font-medium leading-tight text-[var(--text-primary)] min-[800px]:text-[16px] text-[12px] ">
                {stat.title}
              </h3>
            </div>


            <div className="mt-5 flex flex-wrap items-center gap-2 max-[801px]:gap-1">
              <h2 className="whitespace-nowrap text-[20px] font-semibold leading-none text-[var(--text-primary)] max-[900px]:text-[16px] max-[801px]:text-[14px]">
                {stat.value}
              </h2>

              <span
                className={`flex items-center gap-1 rounded-full px-4 py-1 text-[12px] font-medium max-[801px]:text-[10px] ${
                  isPositive
                    ? "bg-[var(--success-bg)] text-[var(--success)]"
                    : "bg-[var(--danger-bg)] text-[var(--danger)]"
                }`}
              >
                {stat.change}

                {isPositive ? (
                  <ArrowUpRight size={17} strokeWidth={2.5} />
                ) : (
                  <ArrowDownRight size={17} strokeWidth={2.5} />
                )}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
