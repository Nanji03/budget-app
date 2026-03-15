import React, { useState } from "react";
import { useTheme } from "../App.jsx";

function SettingsPage({ darkMode, toggleDarkMode }) {
  const { colors } = useTheme();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    currency: "USD",
  });

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      style={{
        display: "grid",
        flexDirection: "column",
        gap: "1.5rem",
      }}
    >
      <section
        style={{
          backgroundColor: "#00000022",
          padding: "1rem",
          borderRadius: 16,
          border: `1px solid ${colors.blue}`,
        }}
      >
        <h2>Profile</h2>
        <div style={{ display: "grid", gap: "0.7rem", marginTop: "0.5rem" }}>
          <div>
            <label>Name</label>
            <input
              style={inputStyle}
              type="text"
              value={profile.name}
              onChange={(e) => handleProfileChange("name", e.target.value)}
              placeholder="Your name"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              style={inputStyle}
              type="email"
              value={profile.email}
              onChange={(e) => handleProfileChange("email", e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label>Currency</label>
            <select
              style={inputStyle}
              value={profile.currency}
              onChange={(e) => handleProfileChange("currency", e.target.value)}
            >
              <option>USD</option>
              <option>CAD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
        </div>
      </section>

      <section
        style={{
          backgroundColor: "#00000022",
          padding: "1rem",
          borderRadius: 16,
          border: `1px solid ${colors.green}`,
          display: "grid",
          gap: "1rem",
        }}
      >
        <div>
          <h2>Appearance</h2>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
            <span>Dark mode</span>
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              style={{ transform: "scale(1.2)" }}
            />
          </label>
        </div>

        <div>
          <h2>Accessibility</h2>
          <ul style={{ fontSize: "0.9rem", paddingLeft: "1.1rem" }}>
            <li>High contrast color palette.</li>
            <li>Clear labels on all interactive elements.</li>
            <li>Keyboard focusable buttons and inputs.</li>
          </ul>
          <p style={{ fontSize: "0.8rem", opacity: 0.8 }}>
            In a full implementation, you could add text size, reduced motion, and screen reader–friendly tweaks here.
          </p>
        </div>

        <div>
          <h2>Session</h2>
          <button
            type="button"
            style={{
              padding: "0.45rem 0.9rem",
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              backgroundColor: colors.pink,
              color: colors.offWhite,
            }}
            onClick={() => alert("Log out clicked (demo only).")}
          >
            Log out
          </button>
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

export default SettingsPage;
