"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const leadSources = [
  {
    name: "Inbound Call",
    value: 9,
    share: 37.87,
    color: "var(--chart-tertiary)",
  },
  {
    name: "Reference",
    value: 1,
    share: 30.6,
    color: "var(--chart-primary)",
  },
  {
    name: "Facebook",
    value: 2,
    share: 6.78,
    color: "var(--primary-light)",
  },
  {
    name: "Website",
    value: 10,
    share: 24.83,
    color: "var(--chart-secondary)",
  },
];

type LabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  outerRadius?: number;
  name?: string;
  value?: number;
  payload?: {
    name: string;
    value: number;
    share: number;
  };
};

function CustomLabel(props: LabelProps) {
  const { cx = 0, cy = 0, midAngle = 0, outerRadius = 0, payload } = props;

  if (!payload) return null;

  const RADIAN = Math.PI / 180;
  const angle = -midAngle * RADIAN;

  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const startRadius = outerRadius - 5;

  const sx = cx + startRadius * cos;
  const sy = cy + startRadius * sin;

  const curveRadius = outerRadius + 12;

  const mx = cx + curveRadius * cos;
  const my = cy + curveRadius * sin;

  const endRadius = outerRadius + 22;

  const ex = cx + endRadius * cos;
  const ey = cy + endRadius * sin;

  const isRight = cos >= 0;

  const arrowEndX = ex + (isRight ? 6 : -6);
  const arrowEndY = ey;

  const textX = arrowEndX + (isRight ? 5 : -5);
  const textY = arrowEndY - 6;

  const path = `
    M ${sx} ${sy}
    Q ${mx} ${my - 20}
    ${arrowEndX} ${arrowEndY}
  `;

  const dx = arrowEndX - mx;
  const dy = arrowEndY - (my - 20);

  const direction = Math.atan2(dy, dx);

  const arrowSize = 9;
  const spread = Math.PI / 6;

  const ax1 = arrowEndX - arrowSize * Math.cos(direction - spread);

  const ay1 = arrowEndY - arrowSize * Math.sin(direction - spread);

  const ax2 = arrowEndX - arrowSize * Math.cos(direction + spread);

  const ay2 = arrowEndY - arrowSize * Math.sin(direction + spread);

  return (
    <g>
      {/* Curved Arrow */}
      <path
        d={path}
        fill="none"
        stroke="var(--text-secondary)"
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Arrow Head */}
      <path
        d={`M ${ax1} ${ay1} L ${arrowEndX} ${arrowEndY} L ${ax2} ${ay2}`}
        fill="none"
        stroke="var(--text-secondary)"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Label Text */}
      <text
        x={textX}
        y={textY}
        textAnchor={isRight ? "start" : "end"}
        fill="var(--text-secondary)"
        fontSize={12}
      >
        <tspan x={textX} dy="0">
          {payload.name}
        </tspan>

        <tspan x={textX} dy="16">
          {payload.value} ({payload.share}%)
        </tspan>
      </text>
    </g>
  );
}

export default function DealsByLeadSource() {
  return (
    <div className="flex h-full min-w-0 flex-col rounded-[var(--radius-lg)] bg-[var(--background-white)] px-4 py-6 shadow-[var(--card-shadow)]">

      <h2 className="text-[18px] font-semibold text-[var(--text-primary)]">
        Deals by Lead Source
      </h2>


      <div className="h-[330px] w-full min-w-0 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart
            margin={{
              top: 35,
              right: 85,
              bottom: 35,
              left: 85,
            }}
          >
            <Pie
              data={leadSources}
              dataKey="share"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius="32%"
              outerRadius="78%"
              startAngle={105}
              endAngle={-255}
              stroke="none"
              labelLine={false}
              label={(props) => <CustomLabel {...props} />}
              isAnimationActive={false}
            >
              {leadSources.map((source) => (
                <Cell key={source.name} fill={source.color} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border)",
                backgroundColor: "var(--background-white)",
                color: "var(--text-primary)",
                fontSize: "12px",
                boxShadow: "var(--card-shadow)",
              }}
              formatter={(_, __, item) => {
                const source = item.payload as (typeof leadSources)[number];

                return [`${source.value} (${source.share}%)`, source.name];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
