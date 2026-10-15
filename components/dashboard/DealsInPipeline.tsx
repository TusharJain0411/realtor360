const pipelineData = [
  {
    id: 1,
    development: "None",
    recordCount: 14,
  },
  {
    id: 2,
    development: "Angel Plaza",
    recordCount: 3,
  },
  {
    id: 3,
    development: "Angel Garden",
    recordCount: 1,
  },
];

export default function DealsInPipeline() {
  return (
    <div className="h-full w-full min-w-0 rounded-[var(--radius-lg)] bg-[var(--background-white)] px-4 py-6 shadow-[var(--card-shadow)]">
    
      <h2 className="mb-6 text-[18px] font-semibold text-[var(--text-primary)]">
        Deals in Pipeline by Development
      </h2>

      <div className="w-full">
     
        <div className="flex items-center justify-between gap-4 rounded-[var(--radius-sm)] bg-[var(--background)] px-4 py-3">
          <span className="text-[16px] font-medium text-[var(--text-primary)]">
            Development Name
          </span>

          <span className="text-right text-[16px] font-medium text-[var(--text-primary)]">
            Record Count
          </span>
        </div>

        <div>
          {pipelineData.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-4 px-4 py-3 transition-colors duration-200 hover:rounded-[var(--radius-sm)] hover:bg-[var(--background-muted)]"
            >
              <span className="text-[14px] text-[var(--text-secondary)]">
                {item.development}
              </span>

              <span className="text-right text-[14px]  text-[var(--text-primary)]">
                {item.recordCount}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
