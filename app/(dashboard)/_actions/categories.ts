"use server"

import { CreateCategorySchema, CreateCategorySchemaType, DeleteCategorySchema, DeleteCategorySchemaType } from "@/components/schema/categories";
import { CategoryModel } from "@/lib/models";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateCategory(form: CreateCategorySchemaType) {
    const parsedBody = CreateCategorySchema.safeParse(form);
    if(!parsedBody.success) {
        throw new Error("Bad request")
    }

    const user = await currentUser()
    if(!user) {
        redirect('/sign-in')
    }

    const {name, icon, type} = parsedBody.data
    return await CategoryModel.query().insertAndFetch({
        name,
        icon,
        type,
        userId: user.id,
    });
}

export async function DeleteCategory(form: DeleteCategorySchemaType) {
    const parsedBody = DeleteCategorySchema.safeParse(form);
    if(!parsedBody.success) {
        throw new Error("Bad request")
    }

    const user = await currentUser()
    if(!user) {
        redirect('/sign-in')
    }

    await CategoryModel.query()
        .where({
            userId: user.id,
            name: parsedBody.data.name,
            type: parsedBody.data.type,
        })
        .delete();
}
