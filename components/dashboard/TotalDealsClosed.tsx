const dealsData = {
  closed: 72,
  inProgress: 132,
};

export default function TotalDealsClosed() {
  const total = dealsData.closed + dealsData.inProgress;

  const closedPercentage = total > 0 ? (dealsData.closed / total) * 100 : 0;

  return (
    <div className="w-full min-w-0 rounded-[var(--radius-lg)] bg-[var(--background-white)] px-4 py-4 shadow-[var(--card-shadow)]">
      <h2 className="mb-4 text-[16px] font-semibold text-[var(--text-primary)]">
        Total Deals Closed
      </h2>

      <div className="relative h-[48px] w-full rounded-[14px] bg-[var(--background)]">
      
        <div
          className="h-full rounded-[14px] transition-all duration-500"
          style={{
            width: `${closedPercentage}%`,
            background:
              "linear-gradient(to right, var(--primary), var(--primary-light))",
          }}
        />

    
        <div
          className="absolute top-[-5px] h-[58px] border-l-2 border-dashed border-[var(--primary-hover)]"
          style={{
            left: `${closedPercentage}%`,
          }}
        />
      </div>

   
      <div className="mt-2 flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-2">
          <span className="text-[16px] font-semibold leading-none text-[var(--text-primary)]">
            {dealsData.closed}
          </span>

          <span className="text-[12px] text-[var(--text-secondary)]">
            Closed Deals
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-[16px] font-semibold leading-none text-[var(--text-primary)]">
            {dealsData.inProgress}
          </span>

          <span className="text-[12px] text-[var(--text-secondary)]">
            In Progress
          </span>
        </div>
      </div>
    </div>
  );
}
