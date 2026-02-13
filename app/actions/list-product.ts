'use server'

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function listProduct(prevState: any, formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const category = formData.get("category") as string;
    const imageUrl = formData.get("imageUrl") as string;

    // Basic validation
    if (!title || !description || isNaN(price) || !category) {
        return { error: "Please fill in all required fields correctly.", message: "" };
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        return { error: "You must be logged in to list a product.", message: "" };
    }

    // Verify seller status in DB
    const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
        select: { id: true, isSeller: true }
    });

    if (!dbUser || !dbUser.isSeller) {
        return { error: "Only registered sellers can list products.", message: "" };
    }

    try {
        await prisma.product.create({
            data: {
                title,
                description,
                price,
                category,
                images: imageUrl ? [imageUrl] : [],
                sellerId: dbUser.id
            }
        });

        revalidatePath('/shop');
        revalidatePath('/');
    } catch (error) {
        console.error("Error creating product:", error);
        return { error: "Failed to list product. Please try again.", message: "" };
    }

    redirect("/shop");
}
