import { Model } from "objection";
import type { Transaction as TransactionType } from "@/lib/db-types";

export class TransactionModel extends Model implements TransactionType {
  id!: string;
  createdAt!: Date;
  updatedAt!: Date;
  amount!: number;
  description!: string;
  date!: Date;
  userId!: string;
  type!: string;
  category!: string;
  categoryIcon!: string;

  static get tableName() {
    return "Transaction";
  }

  static get idColumn() {
    return "id";
  }
}
