"use server"

import { UserSettingsModel } from "@/lib/models";
import { UpdateUserCurrencySchema } from "@/components/schema/userSettings"
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function UpdateUserCurrency(currency: string){
    const parsedBody = UpdateUserCurrencySchema.safeParse({
        currency,
    })

    if(!parsedBody.success){
        throw parsedBody.error
    }
    
    const user = await currentUser();
    if(!user){
        redirect('/sign-in')
    }

    const userSettings = await UserSettingsModel.query().patchAndFetchById(user.id, { currency });
    if (!userSettings) throw new Error("User settings not found");
    return userSettings;
}
