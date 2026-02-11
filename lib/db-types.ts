// DB row types (replacing Prisma-generated types)

export interface UserSettings {
  userId: string;
  currency: string;
}

export interface Category {
  createdAt: Date;
  name: string;
  userId: string;
  icon: string;
  type: string;
}

export interface Transaction {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  description: string;
  date: Date;
  userId: string;
  type: string;
  category: string;
  categoryIcon: string;
}

export interface MonthHistory {
  userId: string;
  day: number;
  month: number;
  year: number;
  income: number;
  expenses: number;
}

export interface YearHistory {
  userId: string;
  month: number;
  year: number;
  income: number;
  expenses: number;
}
