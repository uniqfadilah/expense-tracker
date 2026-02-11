# 💰 Expense Tracker App

A simple, efficient, and user-friendly expense tracker that helps you manage your finances with ease. Track your income, expenses, categorize transactions, and handle multiple currencies—all in one place.

## 🚀 Tech Stack

- **Next.js** – React framework for fast, modern web applications  
- **Clerk** – User authentication and management  
- **Tailwind CSS** – Utility-first CSS framework for sleek, responsive designs  
- **ShadCN** – Beautiful UI components for a polished interface  
- **Knex.js** – SQL query builder with PostgreSQL  
- **Objection.js** – ORM on top of Knex (models and relations)  

## ✨ Features

- **🔐 User Authentication:** Secure login and account management with Clerk  
- **💸 Income & Expense Tracking:** Record and monitor your financial activity effortlessly  
- **📊 Categories:** Organize transactions with custom categories for better insights  
- **🌍 Multi-Currency Support:** Manage transactions in different currencies seamlessly  
- **📁 Transaction Management:** Edit, delete, and view detailed records of all your transactions  

## ⚙️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone https://github.com/andrechandra/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies:**
   - **Development (local):** `yarn` or `yarn install`
   - **Production / Docker:** `npm install` (uses `package-lock.json`)

3. **Set up environment variables:**
   - Create a `.env` file based on `.env.example`
   - Add your database URL, Clerk API keys, etc.

4. **Run database migrations:**
   ```bash
   npm run db:migrate
   ```
   (or `npx knex migrate:latest`)

5. **Start the development server:**
   ```bash
   yarn dev
   ```
   (or `npm run dev`)

6. **Visit:** [http://localhost:3000](http://localhost:3000)

## 🐳 Running with Docker (PostgreSQL)

The app can run fully in Docker with PostgreSQL:

1. **Set Clerk keys** (required for auth) in `.env`:
   ```bash
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
   CLERK_SECRET_KEY=sk_test_...
   ```

2. **Build and start** (database + app):
   ```bash
   docker compose up --build
   ```

3. **Visit:** [http://localhost:3000](http://localhost:3000)

- **PostgreSQL** runs on port `5432` (user: `expense`, password: `expense_secret`, database: `expense_tracker`).
- The app runs migrations on startup, then starts the Next.js server.
- For local development against the same DB, use `.env.example` and run `docker compose up postgres -d`, then `npm run db:migrate` and `npm run dev`.

## 📈 Future Improvements

- Budget planning tools  
- Advanced reporting and analytics  
- Recurring transactions  
- Dark mode support  

## 📝 License

This project is licensed under the [MIT License](LICENSE).
