"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  Cell,
  Legend,
} from "recharts";

// ─── Actividade semanal ───────────────────────────────────────────────────────

interface WeeklyData {
  day: string;
  hours: number;
}

interface WeeklyChartProps {
  data: WeeklyData[];
}

function WeeklyTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background px-3 py-2 shadow-md text-sm">
      <p className="font-semibold">{label}</p>
      <p className="text-primary">{payload[0].value}h de estudo</p>
    </div>
  );
}

export function WeeklyActivityChart({ data }: WeeklyChartProps) {
  const max = Math.max(...data.map((d) => d.hours));
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 20, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(192 91% 35%)" stopOpacity={1} />
            <stop offset="100%" stopColor="hsl(192 91% 55%)" stopOpacity={0.6} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis
          dataKey="day"
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tickFormatter={(v) => `${v}h`}
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
          width={36}
        />
        <Tooltip content={<WeeklyTooltip />} cursor={{ fill: "hsl(var(--muted))", radius: 6 }} />
        <Bar dataKey="hours" fill="url(#barGrad)" radius={[6, 6, 0, 0]} maxBarSize={48}>
          {data.map((entry, i) => (
            <Cell
              key={i}
              fill={entry.hours === max ? "hsl(192 91% 35%)" : "url(#barGrad)"}
              opacity={entry.hours === max ? 1 : 0.75}
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

// ─── Progresso mensal ─────────────────────────────────────────────────────────

interface MonthlyData {
  month: string;
  completed: number;
}

interface MonthlyChartProps {
  data: MonthlyData[];
}

function MonthlyTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-background px-3 py-2 shadow-md text-sm">
      <p className="font-semibold">{label}</p>
      <p className="text-primary">
        {payload[0].value} {payload[0].value === 1 ? "curso concluído" : "cursos concluídos"}
      </p>
    </div>
  );
}

export function MonthlyProgressChart({ data }: MonthlyChartProps) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <AreaChart data={data} margin={{ top: 20, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(192 91% 35%)" stopOpacity={0.35} />
            <stop offset="100%" stopColor="hsl(192 91% 35%)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
          axisLine={false}
          tickLine={false}
          width={28}
        />
        <Tooltip content={<MonthlyTooltip />} />
        <Area
          type="monotone"
          dataKey="completed"
          stroke="hsl(192 91% 35%)"
          strokeWidth={2.5}
          fill="url(#areaGrad)"
          dot={{ r: 5, fill: "hsl(192 91% 35%)", strokeWidth: 2, stroke: "hsl(var(--background))" }}
          activeDot={{ r: 7, fill: "hsl(192 91% 35%)", stroke: "hsl(var(--background))", strokeWidth: 2 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// ─── Distribuição por categoria (Radial) ──────────────────────────────────────

interface CategoryData {
  name: string;
  value: number;
  fill: string;
}

interface CategoryChartProps {
  data: CategoryData[];
}

export function CategoryRadialChart({ data }: CategoryChartProps) {
  return (
    <div className="space-y-3">
      <ResponsiveContainer width="100%" height={180}>
        <RadialBarChart
          innerRadius="30%"
          outerRadius="90%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <RadialBar dataKey="value" cornerRadius={6} background={{ fill: "hsl(var(--muted))" }} />
          <Tooltip
            formatter={(v) => [`${v} curso${v !== 1 ? "s" : ""}`, ""]}
            contentStyle={{
              fontSize: 12,
              borderRadius: 8,
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--background))",
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="space-y-2">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: d.fill }} />
              <span className="text-muted-foreground">{d.name}</span>
            </div>
            <span className="font-semibold">{d.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
