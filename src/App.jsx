import React, { useState, useMemo, createContext, useContext } from "react";
import BudgetPage from "./pages/BudgetPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const initialCategories = [
  "Rent",
  "Utilities",
  "Groceries",
  "Entertainment",
  "Transport",
  "Other",
];

function App() {
  const [currentPage, setCurrentPage] = useState("budget");
  const [darkMode, setDarkMode] = useState(false);

  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [categoryAllocations, setCategoryAllocations] = useState(() =>
    initialCategories.reduce((acc, cat) => {
      acc[cat] = 0;
      return acc;
    }, {})
  );

  const [transactions, setTransactions] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [monthlySummaries, setMonthlySummaries] = useState([]);

  const themeValue = useMemo(
    () => ({
      darkMode,
      toggleDarkMode: () => setDarkMode((d) => !d),
      colors: {
        green: "#06D6A0",
        blue: "#1B9AAA",
        pink: "#EF476F",
        orange: "#FFC43D",
        offWhite: "#F8FFE5",
        darkBlue: "#073B4C",
      },
    }),
    [darkMode]
  );

  const addTransaction = (tx) => {
    setTransactions((prev) => [...prev, tx]);
  };

  const addReminder = (rem) => {
    setReminders((prev) => [...prev, rem]);
  };

  const saveMonthlySummary = (summary) => {
    setMonthlySummaries((prev) => {
      const others = prev.filter((s) => s.monthKey !== summary.monthKey);
      return [...others, summary].sort((a, b) =>
        a.monthKey.localeCompare(b.monthKey)
      );
    });
  };

  const appBg = darkMode ? themeValue.colors.darkBlue : themeValue.colors.offWhite;
  const appText = darkMode ? themeValue.colors.offWhite : themeValue.colors.darkBlue;

  return (
    <ThemeContext.Provider value={themeValue}>
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: appBg,
          color: appText,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            padding: "1rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: `2px solid ${themeValue.colors.blue}`,
          }}
        >
          <h1 style={{ margin: 0 }}>Budget</h1>
          <nav style={{ display: "flex", gap: "1rem" }}>
            <button
              onClick={() => setCurrentPage("budget")}
              style={navButtonStyle(currentPage === "budget", themeValue)}
            >
              Budget
            </button>
            <button
              onClick={() => setCurrentPage("dashboard")}
              style={navButtonStyle(currentPage === "dashboard", themeValue)}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentPage("settings")}
              style={navButtonStyle(currentPage === "settings", themeValue)}
            >
              Settings
            </button>
          </nav>
        </header>

        <main style={{ flex: 1, padding: "1.5rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
          {currentPage === "budget" && (
            <BudgetPage
              monthlyBudget={monthlyBudget}
              setMonthlyBudget={setMonthlyBudget}
              categoryAllocations={categoryAllocations}
              setCategoryAllocations={setCategoryAllocations}
              categories={initialCategories}
              transactions={transactions}
              addTransaction={addTransaction}
              reminders={reminders}
              addReminder={addReminder}
              saveMonthlySummary={saveMonthlySummary}
            />
          )}

          {currentPage === "dashboard" && (
            <DashboardPage
              monthlyBudget={monthlyBudget}
              categoryAllocations={categoryAllocations}
              transactions={transactions}
              monthlySummaries={monthlySummaries}
            />
          )}

          {currentPage === "settings" && (
            <SettingsPage
              darkMode={darkMode}
              toggleDarkMode={themeValue.toggleDarkMode}
            />
          )}
        </main>

        <footer
          style={{
            padding: "0.5rem 2rem 1rem",
            fontSize: "0.8rem",
            opacity: 0.8,
          }}
        >
          Budget• Demo only (no real notifications)
        </footer>
      </div>
    </ThemeContext.Provider>
  );
}

function navButtonStyle(active, theme) {
  return {
    padding: "0.4rem 0.9rem",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    backgroundColor: active ? theme.colors.green : "transparent",
    color: active ? theme.colors.darkBlue : theme.colors.offWhite,
  };
}

export default App;
