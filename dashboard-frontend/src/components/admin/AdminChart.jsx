import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#0f3d3e", "#d97706", "#3b82f6", "#10b981", "#8b5cf6", "#ef4444"];

export default function AdminChart({
  type = "bar",
  title,
  description,
  data,
  xKey = "name",
  dataKey = "value",
  series = [],
  nameKey = "name",
}) {
  return (
    <section className="panel-card">
      <div className="panel-heading">
        <div>
          <p className="section-kicker">Charts</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="chart-area">
        <ResponsiveContainer width="100%" height="100%">
          {type === "line" ? (
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d7dedf" />
              <XAxis dataKey={xKey} stroke="#5b6972" />
              <YAxis allowDecimals={false} stroke="#5b6972" />
              <Tooltip />
              <Legend />
              {series.map((item, index) => (
                <Line
                  key={item.dataKey}
                  type="monotone"
                  dataKey={item.dataKey}
                  name={item.label}
                  stroke={COLORS[index % COLORS.length]}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              ))}
            </LineChart>
          ) : null}

          {type === "bar" ? (
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d7dedf" />
              <XAxis dataKey={xKey} stroke="#5b6972" />
              <YAxis allowDecimals={false} stroke="#5b6972" />
              <Tooltip />
              <Legend />
              {series.map((item, index) => (
                <Bar
                  key={item.dataKey}
                  dataKey={item.dataKey}
                  name={item.label}
                  fill={COLORS[index % COLORS.length]}
                  radius={[8, 8, 0, 0]}
                />
              ))}
            </BarChart>
          ) : null}

          {type === "pie" ? (
            <PieChart>
              <Pie
                data={data}
                dataKey={dataKey}
                nameKey={nameKey}
                innerRadius={68}
                outerRadius={108}
                paddingAngle={4}
              >
                {data.map((item, index) => (
                  <Cell key={`${item[nameKey]}-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          ) : null}
        </ResponsiveContainer>
      </div>
    </section>
  );
}
