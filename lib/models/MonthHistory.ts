import { Model } from "objection";
import type { MonthHistory as MonthHistoryType } from "@/lib/db-types";

export class MonthHistoryModel extends Model implements MonthHistoryType {
  userId!: string;
  day!: number;
  month!: number;
  year!: number;
  income!: number;
  expenses!: number;

  static get tableName() {
    return "MonthHistory";
  }

  static get idColumn() {
    return ["day", "month", "year", "userId"];
  }
}
