import { MonthHistoryModel } from "@/lib/models";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET(request: Request){
    const user = await currentUser();
    if(!user){
        redirect('/sign-in')
    }

    const periods = await getHistoryPeriods(user.id)    
    return Response.json(periods);
}

export type GetHistoryPeriodsResponseType = Awaited<ReturnType<typeof getHistoryPeriods>>

async function getHistoryPeriods(userId: string){
    const result = await MonthHistoryModel.query()
        .where("userId", userId)
        .distinct("year")
        .orderBy("year", "asc");

    const years = result.map((el: { year: number }) => el.year);
    if(years.length === 0){
        return [new Date().getFullYear()]
    }
    return years
}
