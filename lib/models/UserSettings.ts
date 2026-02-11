import { Model } from "objection";
import type { UserSettings as UserSettingsType } from "@/lib/db-types";

export class UserSettingsModel extends Model implements UserSettingsType {
  userId!: string;
  currency!: string;

  static get tableName() {
    return "UserSettings";
  }

  static get idColumn() {
    return "userId";
  }
}
