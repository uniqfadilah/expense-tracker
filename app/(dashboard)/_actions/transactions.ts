'use server'

import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/components/schema/transaction";
import { CategoryModel, MonthHistoryModel, TransactionModel, YearHistoryModel } from "@/lib/models";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateTransaction(form: CreateTransactionSchemaType) {
    const parsedBody = CreateTransactionSchema.safeParse(form);

    if (!parsedBody.success) {
        throw new Error(parsedBody.error.message)
    }

    const user = await currentUser();
    if (!user) {
        redirect('/sign-in')
    }

    const {amount, category, date, description, type} = parsedBody.data;
    const categoryRow = await CategoryModel.query().findOne({ userId: user.id, name: category });
    if (!categoryRow) {
        throw new Error('Category not found')
    }

    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const id = crypto.randomUUID();

    await TransactionModel.transaction(async (trx) => {
        await TransactionModel.query(trx).insert({
            id,
            amount,
            category: categoryRow.name,
            categoryIcon: categoryRow.icon,
            date,
            description: description || "",
            type,
            userId: user.id,
        });

        const monthRow = await MonthHistoryModel.query(trx).findOne({
            userId: user.id,
            day,
            month,
            year,
        });

        if (monthRow) {
            await MonthHistoryModel.query(trx)
                .where({ userId: user.id, day, month, year })
                .patch({
                    income: monthRow.income + (type === "income" ? amount : 0),
                    expenses: monthRow.expenses + (type === "expense" ? amount : 0),
                });
        } else {
            await MonthHistoryModel.query(trx).insert({
                userId: user.id,
                day,
                month,
                year,
                income: type === "income" ? amount : 0,
                expenses: type === "expense" ? amount : 0,
            });
        }

        const yearRow = await YearHistoryModel.query(trx).findOne({
            userId: user.id,
            month,
            year,
        });

        if (yearRow) {
            await YearHistoryModel.query(trx)
                .where({ userId: user.id, month, year })
                .patch({
                    income: yearRow.income + (type === "income" ? amount : 0),
                    expenses: yearRow.expenses + (type === "expense" ? amount : 0),
                });
        } else {
            await YearHistoryModel.query(trx).insert({
                userId: user.id,
                month,
                year,
                income: type === "income" ? amount : 0,
                expenses: type === "expense" ? amount : 0,
            });
        }
    });
}
