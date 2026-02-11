import { OverviewQuerySchema } from "@/components/schema/overview";
import { TransactionModel } from "@/lib/models";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    const user = await currentUser();

    if (!user) {    
        redirect('/sign-in')
    }

    const {searchParams} = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const queryParams = OverviewQuerySchema.safeParse({from, to});

    if(!queryParams.success) {
        return Response.json(queryParams.error.message, {status: 400})
    }

    const stats = await getBalanceStats(
        user.id,
        queryParams.data.from,
        queryParams.data.to
    )

    return Response.json(stats)
}

export type GetBalanceStatsResponseType = Awaited<
    ReturnType<typeof getBalanceStats>
>;

async function getBalanceStats(userId: string, from: Date, to: Date) {
    const fromDay = new Date(from.setHours(0, 0, 0, 0));
    const toDay = new Date(to.setHours(23, 59, 59, 999));

    const rows = await TransactionModel.query()
        .where("userId", userId)
        .whereBetween("date", [fromDay, toDay])
        .select("type")
        .sum("amount as total")
        .groupBy("type");

    const expense = rows.find((r: { type: string }) => r.type === "expense");
    const income = rows.find((r: { type: string }) => r.type === "income");

    return {
        expense: expense ? Number(expense.total) : 0,
        income: income ? Number(income.total) : 0,
    };
}
