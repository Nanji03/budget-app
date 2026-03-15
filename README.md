# Budget

Budget is a simple budgeting web application built with React that helps you plan a monthly budget, track daily transactions, and visualize spending over time.

## Features

- **Monthly budget planning**
  - Set a total monthly budget.
  - Allocate the budget across categories (Rent, Utilities, Groceries, Entertainment, Transport, Other).
  - See how much you have allocated vs your total monthly budget.
  - Save a monthly snapshot for use in the dashboard time series.

- **Transactions and tracking**
  - Add daily transactions with date, category, amount, and an optional description.
  - See how much is spent and left for each category within the month.
  - View a list of recent transactions.

- **Reminders (UI only)**
  - Create reminders for:
    - Upcoming bills (e.g., rent, utilities).
    - Budget warnings or general notes.
  - Reminders are stored in-app (no real notifications, demo only).

- **Dashboard**
  - **Budget distribution (Pie chart)** – shows how your monthly budget is allocated across categories.
  - **Monthly performance (Line chart)** – shows budget vs actual spending per month:
    - Months over budget are highlighted in red.
    - Months under budget are highlighted in green.

- **Settings**
  - Edit basic profile info (name, email, currency).
  - Toggle dark mode / light mode.
  - Accessibility notes (high contrast, clear labels, keyboard focus).
  - Log out button (non-functional demo action).

## Tech Stack

- **Frontend:** React (Vite)
- **Charts:** `react-chartjs-2` + `Chart.js`
- **Styling:** Inline styles + base CSS
- **State management:** React hooks (`useState`, `useMemo`, context for theme)

## Color Palette

The app uses the following color scheme:

- Green: `#06D6A0`
- Blue: `#1B9AAA`
- Pink: `#EF476F`
- Orange: `#FFC43D`
- Off white: `#F8FFE5`
- Dark blue: `#073B4C`

## Getting Started

### Prerequisites

- Node.js (LTS) and npm installed

### Installation

```bash
# Clone the repository
git clone https://github.com/Nanji03/budget-app.git
cd budget-app

# Install dependencies
npm install
