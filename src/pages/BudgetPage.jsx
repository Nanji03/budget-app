import React, { useState, useMemo } from "react";
import { useTheme } from "../App.jsx";

function BudgetPage({
  monthlyBudget,
  setMonthlyBudget,
  categoryAllocations,
  setCategoryAllocations,
  categories,
  transactions,
  addTransaction,
  reminders,
  addReminder,
  saveMonthlySummary,
}) {
  const { colors } = useTheme();
  const [txForm, setTxForm] = useState({
    date: "",
    category: "Groceries",
    amount: "",
    description: "",
  });

  const [remForm, setRemForm] = useState({
    title: "",
    date: "",
    type: "Bill due",
  });

  const totalAllocated = useMemo(
    () => Object.values(categoryAllocations).reduce((a, b) => a + Number(b || 0), 0),
    [categoryAllocations]
  );

  const handleBudgetChange = (e) => {
    setMonthlyBudget(Number(e.target.value) || 0);
  };

  const handleAllocationChange = (cat, value) => {
    setCategoryAllocations((prev) => ({
      ...prev,
      [cat]: Number(value) || 0,
    }));
  };

  const handleTxSubmit = (e) => {
    e.preventDefault();
    if (!txForm.date || !txForm.amount) return;
    addTransaction({
      id: Date.now(),
      ...txForm,
      amount: Number(txForm.amount),
    });
    setTxForm((f) => ({ ...f, amount: "", description: "" }));
  };

  const handleReminderSubmit = (e) => {
    e.preventDefault();
    if (!remForm.title || !remForm.date) return;
    addReminder({
      id: Date.now(),
      ...remForm,
    });
    setRemForm({ title: "", date: "", type: "Bill due" });
  };

  const totalSpentByCategory = useMemo(() => {
    const map = {};
    categories.forEach((c) => (map[c] = 0));
    transactions.forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
    return map;
  }, [transactions, categories]);

  const handleSaveMonth = () => {
    const now = txForm.date || new Date().toISOString().slice(0, 10);
    const monthKey = now.slice(0, 7);
    const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
    saveMonthlySummary({
      monthKey,
      budget: monthlyBudget,
      spent: totalSpent,
    });
    alert("Monthly snapshot saved for " + monthKey);
  };

  return (
    <div
      style={{
        display: "grid",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <section>
        <h2>Monthly Budget</h2>
        <div
          style={{
            backgroundColor: "#ffffff11",
            padding: "1rem",
            borderRadius: 12,
            border: `1px solid ${colors.blue}`,
          }}
        >
          <label style={{ display: "block", marginBottom: "0.5rem" }}>
            Budget per month
          </label>
          <input
  type="number"
  inputMode="numeric"
  className="no-spin"
  value={monthlyBudget}
  onChange={handleBudgetChange}
  placeholder="e.g. 2000"
  style={inputStyle}
/>

          <p style={{ marginTop: "0.5rem", fontSize: "0.85rem" }}>
  You allocated {totalAllocated.toFixed(2)} out of your monthly budget of{" "}
  {monthlyBudget.toFixed(2)}.
</p>


          <h3 style={{ marginTop: "1rem" }}>Category allocations</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
            {categories.map((cat) => (
              <div key={cat} style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: "0.9rem" }}>{cat}</span>
                <input
                  type="number"
                  value={categoryAllocations[cat] || ""}
                  onChange={(e) => handleAllocationChange(cat, e.target.value)}
                  style={inputStyle}
                  placeholder="0"
                />
                <span style={{ fontSize: "0.75rem", opacity: 0.8 }}>
                  Spent: {totalSpentByCategory[cat]?.toFixed(2) || 0}
                  {" • "}
                  Left:{" "}
                  {Math.max(
                    0,
                    (categoryAllocations[cat] || 0) - (totalSpentByCategory[cat] || 0)
                  ).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

           <button
      type="button"
      onClick={handleSaveMonth}
      style={{
        marginTop: "1rem",
        padding: "0.45rem 0.9rem",
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        fontWeight: 600,
        backgroundColor: colors.green,
        color: colors.darkBlue,
      }}
    >
      Save monthly budget
    </button>
        </div>

        <h2 style={{ marginTop: "1.5rem" }}>Add transaction</h2>
        <form
          onSubmit={handleTxSubmit}
          style={{
            backgroundColor: "#ffffff11",
            padding: "1rem",
            borderRadius: 12,
            border: `1px solid ${colors.green}`,
            display: "grid",
            gap: "0.7rem",
          }}
        >
          <div>
            <label>Date</label>
            <input
              type="date"
              value={txForm.date}
              onChange={(e) => setTxForm({ ...txForm, date: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label>Category</label>
            <select
              value={txForm.category}
              onChange={(e) => setTxForm({ ...txForm, category: e.target.value })}
              style={inputStyle}
            >
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label>Amount</label>
            <input
              type="number"
              value={txForm.amount}
              onChange={(e) => setTxForm({ ...txForm, amount: e.target.value })}
              style={inputStyle}
              placeholder="e.g. 30"
            />
          </div>
          <div>
            <label>Description (optional)</label>
            <input
              type="text"
              value={txForm.description}
              onChange={(e) => setTxForm({ ...txForm, description: e.target.value })}
              style={inputStyle}
              placeholder="Groceries at market"
            />
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <button type="submit" style={primaryButton(colors.green, colors.darkBlue)}>
              Add
            </button>
            <button type="button" onClick={handleSaveMonth} style={secondaryButton(colors.blue)}>
              Save monthly snapshot
            </button>
          </div>
        </form>

        <h3 style={{ marginTop: "1.5rem" }}>Recent transactions</h3>
        <div
          style={{
            maxHeight: 220,
            overflowY: "auto",
            backgroundColor: "#ffffff11",
            borderRadius: 12,
            padding: "0.5rem 0.75rem",
            border: `1px solid ${colors.orange}`,
          }}
        >
          {transactions.length === 0 && <p style={{ fontSize: "0.85rem" }}>No transactions yet.</p>}
          {transactions
            .slice()
            .reverse()
            .map((t) => (
              <div
                key={t.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.3rem 0",
                  borderBottom: "1px solid #ffffff22",
                  fontSize: "0.85rem",
                }}
              >
                <span>
                  {t.date} • {t.category}
                  {t.description ? ` • ${t.description}` : ""}
                </span>
                <span style={{ fontWeight: 600 }}>${t.amount.toFixed(2)}</span>
              </div>
            ))}
        </div>
      </section>

      <section>
        <h2>Reminders</h2>
        <form
          onSubmit={handleReminderSubmit}
          style={{
            backgroundColor: "#ffffff11",
            padding: "1rem",
            borderRadius: 12,
            border: `1px solid ${colors.pink}`,
            display: "grid",
            gap: "0.7rem",
          }}
        >
          <div>
            <label>Title</label>
            <input
              type="text"
              value={remForm.title}
              onChange={(e) => setRemForm({ ...remForm, title: e.target.value })}
              style={inputStyle}
              placeholder="Pay rent"
            />
          </div>
          <div>
            <label>Date</label>
            <input
              type="date"
              value={remForm.date}
              onChange={(e) => setRemForm({ ...remForm, date: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label>Type</label>
            <select
              value={remForm.type}
              onChange={(e) => setRemForm({ ...remForm, type: e.target.value })}
              style={inputStyle}
            >
              <option>Bill due</option>
              <option>Budget warning</option>
              <option>General reminder</option>
            </select>
          </div>
          <button type="submit" style={primaryButton(colors.pink, colors.offWhite)}>
            Add reminder
          </button>
        </form>

        <div
          style={{
            marginTop: "1rem",
            backgroundColor: "#ffffff11",
            borderRadius: 12,
            padding: "0.75rem",
            border: `1px solid ${colors.blue}`,
            maxHeight: 260,
            overflowY: "auto",
          }}
        >
          {reminders.length === 0 && (
            <p style={{ fontSize: "0.85rem" }}>No reminders set. Notifications are just visual in this demo.</p>
          )}
          {reminders
            .slice()
            .sort((a, b) => a.date.localeCompare(b.date))
            .map((r) => (
              <div
                key={r.id}
                style={{
                  padding: "0.4rem 0",
                  borderBottom: "1px solid #ffffff22",
                  fontSize: "0.85rem",
                }}
              >
                <div style={{ fontWeight: 600 }}>{r.title}</div>
                <div style={{ opacity: 0.85 }}>
                  {r.date} • {r.type}
                </div>
              </div>
            ))}
        </div>

        <div
          style={{
            marginTop: "1rem",
            fontSize: "0.8rem",
            padding: "0.6rem 0.75rem",
            borderRadius: 10,
            backgroundColor: "#00000022",
          }}
        >
          In a production app, these reminders would trigger actual notifications when bills are due or categories go over budget.
        </div>
      </section>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.4rem 0.6rem",
  borderRadius: 8,
  border: "1px solid #ffffff55",
  background: "#00000022",
  color: "inherit",
  outline: "none",
};

const primaryButton = (bg, text) => ({
  padding: "0.45rem 0.9rem",
  borderRadius: 999,
  border: "none",
  cursor: "pointer",
  fontWeight: 600,
  backgroundColor: bg,
  color: text,
});

const secondaryButton = (border) => ({
  padding: "0.4rem 0.9rem",
  borderRadius: 999,
  border: `1px solid ${border}`,
  cursor: "pointer",
  fontWeight: 500,
  backgroundColor: "transparent",
  color: "inherit",
});

export default BudgetPage;
