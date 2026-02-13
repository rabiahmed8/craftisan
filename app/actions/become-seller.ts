'use server'

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function becomeSeller(prevState: any, formData: FormData) {
    const shopName = formData.get("shopName") as string;

    if (!shopName || shopName.length < 3) {
        return { error: "Shop name must be at least 3 characters long", message: "" };
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        return { error: "You must be logged in to become a seller", message: "" };
    }

    try {
        // Upsert user in Prisma to ensure they exist
        await prisma.user.upsert({
            where: { email: user.email },
            update: {
                isSeller: true,
                shopName: shopName
            },
            create: {
                id: user.id, // Important: Sync Supabase Auth ID
                email: user.email!,
                isSeller: true,
                shopName: shopName,
                name: user.user_metadata?.name || user.email?.split('@')[0], // Fallback name
            }
        });

        revalidatePath('/');
    } catch (error) {
        console.error("Error updating user:", error);
        return { error: "Failed to create seller profile", message: "" };
    }

    redirect("/");
}
