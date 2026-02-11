"use server"

import { MonthHistoryModel, TransactionModel, YearHistoryModel } from "@/lib/models";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function DeleteTransaction(id: string) {
    const user = await currentUser()
    if(!user) {
        redirect('/sign-in')
    }

    const transaction = await TransactionModel.query().findOne({
        id,
        userId: user.id,
    });

    if(!transaction) {
        throw new Error('Transaction not found')
    }

    const d = transaction.date instanceof Date ? transaction.date : new Date(transaction.date);
    const day = d.getDate();
    const month = d.getMonth();
    const year = d.getFullYear();

    await TransactionModel.transaction(async (trx) => {
        await TransactionModel.query(trx).where({ id, userId: user.id }).delete();

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
                    income: monthRow.income - (transaction.type === "income" ? transaction.amount : 0),
                    expenses: monthRow.expenses - (transaction.type === "expense" ? transaction.amount : 0),
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
                    income: yearRow.income - (transaction.type === "income" ? transaction.amount : 0),
                    expenses: yearRow.expenses - (transaction.type === "expense" ? transaction.amount : 0),
                });
        }
    });
}
