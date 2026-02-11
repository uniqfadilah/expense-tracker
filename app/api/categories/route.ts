import { CategoryModel } from "@/lib/models";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { z } from "zod";

export async function GET(request: Request){
    const user = await currentUser();
    if(!user){
        redirect('/sign-in')
    }

    const {searchParams} = new URL(request.url);
    const paramType = searchParams.get('type')

    const validator = z.enum(['expense', 'income']).nullable()
    const queryParams = validator.safeParse(paramType)

    if(!queryParams.success){
        return Response.json(queryParams.error, {status: 400})
    }

    const type = queryParams.data;
    let query = CategoryModel.query().where("userId", user.id).orderBy("name", "asc");
    if (type) query = query.where("type", type);
    const categories = await query;

    return Response.json(categories);
}
