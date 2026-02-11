import { Model } from "objection";
import type { YearHistory as YearHistoryType } from "@/lib/db-types";

export class YearHistoryModel extends Model implements YearHistoryType {
  userId!: string;
  month!: number;
  year!: number;
  income!: number;
  expenses!: number;

  static get tableName() {
    return "YearHistory";
  }

  static get idColumn() {
    return ["month", "year", "userId"];
  }
}
