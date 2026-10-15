"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  {
    name: "Deal Owner",
    angelPlaza: 5,
    angelGarden: 11.2,
    none: 17.9,
  },
  {
    name: "",
    angelPlaza: 2.4,
    angelGarden: 7.9,
    none: 12.2,
  },
];

const chartColors = {
  plaza: "var(--chart-primary)",
  garden: "var(--chart-secondary)",
  none: "var(--chart-tertiary)",
  grid: "var(--border)",
  text: "var(--text-secondary)",
  background: "var(--background-white)",
};

const legendItems = [
  { name: "Angel Plaza", color: chartColors.plaza },
  { name: "Angel Garden", color: chartColors.garden },
  { name: "None", color: chartColors.none },
];

type LayeredBarProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: {
    angelPlaza: number;
    angelGarden: number;
    none: number;
  };
};

function LayeredHorizontalBar({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  payload,
}: LayeredBarProps) {
  if (!payload || width <= 0 || height <= 0) return null;

  const total = payload.none;
  if (total <= 0) return null;

  const gardenWidth = width * (payload.angelGarden / total);
  const plazaWidth = width * (payload.angelPlaza / total);

  const createRoundedPath = (barWidth: number) => {
    const radius = Math.min(12, height / 2, barWidth);

    return `
      M ${x} ${y}
      H ${x + barWidth - radius}
      Q ${x + barWidth} ${y} ${x + barWidth} ${y + radius}
      V ${y + height - radius}
      Q ${x + barWidth} ${y + height} ${x + barWidth - radius} ${y + height}
      H ${x}
      Z
    `;
  };

  return (
    <g>
      {/* None - Background Layer */}
      <path d={createRoundedPath(width)} fill={chartColors.none} />

      {/* Angel Garden - Middle Layer */}
      <path d={createRoundedPath(gardenWidth)} fill={chartColors.garden} />

      {/* Angel Plaza - Front Layer */}
      <path d={createRoundedPath(plazaWidth)} fill={chartColors.plaza} />
    </g>
  );
}

export default function DealsBySalesPeople() {
  return (
    <div className="flex h-full min-w-0 flex-col rounded-[var(--radius-lg)] bg-[var(--background-white)] px-4 py-4 shadow-[var(--card-shadow)]">

      <h2 className="text-[16px] font-semibold text-[var(--text-primary)]">
        Deals by Sales People by Development
      </h2>

      <div className="mt-3 h-[130px] w-full min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={salesData}
            layout="vertical"
            barCategoryGap="15%"
            margin={{
              top: 0,
              right: 20,
              bottom: 5,
              left: 0,
            }}
          >
            <CartesianGrid
              stroke={chartColors.grid}
              vertical
              horizontal={false}
            />

            <XAxis
              type="number"
              domain={[0, 20]}
              ticks={[0, 2.5, 5, 7.5, 10, 12.5, 15, 17.5, 20]}
              tick={{
                fontSize: 10,
                fill: chartColors.text,
              }}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              type="category"
              dataKey="name"
              width={45}
              tick={false}
              axisLine={false}
              tickLine={false}
              label={{
                value: "Deal Owner",
                angle: -90,
                position: "insideLeft",
                fill: chartColors.text,
                fontSize: 12,
                textAnchor: "middle",
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
                backgroundColor: chartColors.background,
                color: "var(--text-primary)",
                fontSize: "12px",
                boxShadow: "var(--card-shadow)",
              }}
              formatter={(_, __, item) => {
                const data = item.payload as (typeof salesData)[number];

                return [
                  `Angel Plaza: ${data.angelPlaza}, Angel Garden: ${data.angelGarden}, None: ${data.none}`,
                  "Deals",
                ];
              }}
            />

            <Bar
              dataKey="none"
              name="Deals"
              barSize={35}
              shape={(props: unknown) => (
                <LayeredHorizontalBar {...(props as LayeredBarProps)} />
              )}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h3 className="text-center text-[12px] font-medium text-[var(--text-secondary)]">
        Record Count
      </h3>

      <div className="mt-3 mb-0 flex flex-wrap items-center gap-x-6 gap-y-2">
        {legendItems.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="h-[14px] w-[14px] shrink-0 rounded-full"
              style={{
                backgroundColor: item.color,
              }}
            />

            <span className="text-[12px] text-[var(--text-secondary)]">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
