import { Model } from "objection";
import type { Category as CategoryType } from "@/lib/db-types";

export class CategoryModel extends Model implements CategoryType {
  createdAt!: Date;
  name!: string;
  userId!: string;
  icon!: string;
  type!: string;

  static get tableName() {
    return "Category";
  }

  static get idColumn() {
    return ["name", "userId", "type"];
  }
}
