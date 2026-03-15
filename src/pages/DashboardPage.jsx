import React, { useMemo } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { useTheme } from "../App.jsx";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

function DashboardPage({ monthlyBudget, categoryAllocations, transactions, monthlySummaries }) {
  const { colors } = useTheme();

  const pieData = useMemo(() => {
    const labels = Object.keys(categoryAllocations);
    const values = labels.map((l) => categoryAllocations[l] || 0);
    return {
      labels,
      datasets: [
        {
          label: "Budget allocation",
          data: values,
          backgroundColor: [colors.green, colors.blue, colors.pink, colors.orange, colors.offWhite, colors.darkBlue],
          borderColor: "#00000033",
          borderWidth: 1,
        },
      ],
    };
  }, [categoryAllocations, colors]);

  const currentMonthTotalSpent = useMemo(
    () => transactions.reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const lineData = useMemo(() => {
    const summaries = monthlySummaries.slice().sort((a, b) => a.monthKey.localeCompare(b.monthKey));
    if (summaries.length === 0 && monthlyBudget > 0) {
      summaries.push({
        monthKey: new Date().toISOString().slice(0, 7),
        budget: monthlyBudget,
        spent: currentMonthTotalSpent,
      });
    }

    const labels = summaries.map((s) => s.monthKey);
    const spent = summaries.map((s) => s.spent);
    const budget = summaries.map((s) => s.budget);
    const backgroundColors = summaries.map((s) =>
      s.spent > s.budget ? colors.pink : colors.green
    );

    return {
      labels,
      datasets: [
        {
          label: "Spent",
          data: spent,
          borderColor: "#ffffff",
          backgroundColor: backgroundColors,
          tension: 0.2,
        },
        {
          label: "Budget",
          data: budget,
          borderColor: colors.blue,
          backgroundColor: "transparent",
          borderDash: [6, 4],
          tension: 0,
        },
      ],
    };
  }, [monthlySummaries, monthlyBudget, currentMonthTotalSpent, colors]);

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    scales: {
      x: {
        ticks: { color: "#ffffffdd" },
      },
      y: {
        ticks: { color: "#ffffffdd" },
      },
    },
  };

  return (
    <div
      style={{
        display: "grid",
        flexDirection: "column",
        gap: "1.5rem",
        alignItems: "stretch",
      }}
    >
      <section
        style={{
          backgroundColor: "#00000022",
          borderRadius: 16,
          padding: "1rem",
          border: `1px solid ${colors.blue}`,
          minHeight: 320,
        }}
      >
        <h2>Budget distribution</h2>
        <p style={{ fontSize: "0.85rem", opacity: 0.85 }}>
          See how much of your monthly budget is assigned to each category.
        </p>
        <Pie data={pieData} />
      </section>

      <section
        style={{
          backgroundColor: "#00000022",
          borderRadius: 16,
          padding: "1rem",
          border: `1px solid ${colors.green}`,
        }}
      >
        <h2>Monthly performance</h2>
        <p style={{ fontSize: "0.85rem", opacity: 0.85 }}>
          If the “Spent” line is above the dashed “Budget” line in a month, that month is over budget (shown in red). If it stays below, it is under budget (green).
        </p>
        <Line data={lineData} options={lineOptions} />
      </section>
    </div>
  );
}

export default DashboardPage;
