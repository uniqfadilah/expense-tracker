import { UserSettingsModel } from "@/lib/models";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
    const user = await currentUser();

    if (!user) {
        redirect('/sign-in')
    }

    let userSettings = await UserSettingsModel.query().findById(user.id);

    if(!userSettings) {
        userSettings = await UserSettingsModel.query().insertAndFetch({
            userId: user.id,
            currency: 'IDR',
        });
    }

    revalidatePath('/')
    return Response.json(userSettings)
}
