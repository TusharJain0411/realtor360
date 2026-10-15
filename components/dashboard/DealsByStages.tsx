"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const stageData = [
  { stage: "Interested", angelPlaza: 3, angelGarden: 5.6, none: 7.9 },
  { stage: "Site Visit Done", angelPlaza: 3.8, angelGarden: 7.1, none: 10 },
  { stage: "Unit Shortlisted", angelPlaza: 3.5, angelGarden: 6.6, none: 9.3 },
  { stage: "Contracts Signed", angelPlaza: 3.8, angelGarden: 7.1, none: 10 },
  { stage: "Offer Initiated", angelPlaza: 3.2, angelGarden: 5.9, none: 8.4 },
  { stage: "Offer Accepted", angelPlaza: 3.8, angelGarden: 7.1, none: 10 },
];

const chartColors = {
  plaza: "var(--chart-primary)",
  garden: "var(--chart-secondary)",
  none: "var(--chart-tertiary)",
  grid: "var(--border)",
  text: "var(--text-secondary)",
  background: "var(--background-white)",
};

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

function LayeredBar({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  payload,
}: LayeredBarProps) {
  if (!payload || height <= 0 || width <= 0) return null;

  const total = payload.none;
  if (total <= 0) return null;

  const gardenHeight = height * (payload.angelGarden / total);
  const plazaHeight = height * (payload.angelPlaza / total);

  const createRoundedPath = (barHeight: number) => {
    const top = y + height - barHeight;
    const radius = Math.min(10, width / 2, barHeight);

    return `
      M ${x} ${y + height}
      V ${top + radius}
      Q ${x} ${top} ${x + radius} ${top}
      H ${x + width - radius}
      Q ${x + width} ${top} ${x + width} ${top + radius}
      V ${y + height}
      Z
    `;
  };

  return (
    <g>
      {/* None - Background Layer */}
      <path d={createRoundedPath(height)} fill={chartColors.none} />

      {/* Angel Garden - Middle Layer */}
      <path d={createRoundedPath(gardenHeight)} fill={chartColors.garden} />

      {/* Angel Plaza - Front Layer */}
      <path d={createRoundedPath(plazaHeight)} fill={chartColors.plaza} />
    </g>
  );
}

export default function DealsByStages() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");

    const updateScreen = () => {
      setIsSmallScreen(mediaQuery.matches);
    };

    updateScreen();

    mediaQuery.addEventListener("change", updateScreen);

    return () => {
      mediaQuery.removeEventListener("change", updateScreen);
    };
  }, []);

  return (
    <div className="flex h-full min-w-0 flex-col rounded-[var(--radius-lg)] bg-[var(--background-white)] px-4 py-4 shadow-[var(--card-shadow)]">

      <h2 className="text-[16px] font-semibold text-[var(--text-primary)]">
        Deals by Stages by Development
      </h2>

      <div className="mt-4 w-full min-w-0 overflow-x-auto">
        <div
          className="h-[310px]"
          style={{
            width: isSmallScreen ? "320px" : "100%",
            minWidth: isSmallScreen ? "320px" : "420px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={stageData}
              barCategoryGap={isSmallScreen ? 65 : 30}
              margin={{
                top: 10,
                right: 10,
                bottom: 5,
                left: 5,
              }}
            >
              <CartesianGrid stroke={chartColors.grid} vertical={false} />

              <XAxis
                dataKey="stage"
                angle={-40}
                textAnchor="end"
                interval={0}
                height={105}
                tick={{
                  fontSize: 11,
                  fill: chartColors.text,
                }}
                tickLine={false}
                axisLine={{
                  stroke: chartColors.grid,
                }}
              />

              <YAxis
                domain={[0, 10]}
                ticks={[0, 2.5, 5, 7.5, 10]}
                tick={{
                  fontSize: 11,
                  fill: chartColors.text,
                }}
                tickLine={false}
                axisLine={false}
                label={{
                  value: "Record Count",
                  angle: -90,
                  position: "insideLeft",
                  offset: 5,
                  fill: chartColors.text,
                  fontSize: 15,
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
              />

              <Bar
                dataKey="none"
                name="None"
                barSize={isSmallScreen ? 32 : 38}
                shape={(props: any) => <LayeredBar {...props} />}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

   
        <div className="mt-[-20px] text-center">
          <h3 className="text-[12px] font-medium text-[var(--text-secondary)]">
            Stage
          </h3>
        </div>

     
        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-3">
          {[
            {
              name: "Angel Plaza",
              color: chartColors.plaza,
            },
            {
              name: "Angel Garden",
              color: chartColors.garden,
            },
            {
              name: "None",
              color: chartColors.none,
            },
          ].map((item) => (
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
    </div>
  );
}
