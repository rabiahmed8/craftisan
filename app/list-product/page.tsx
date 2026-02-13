import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ListProductForm } from "@/components/list-product-form";
import { Header } from "@/components/layout/header";

export default async function ListProductPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        redirect("/login");
    }

    const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
    });

    if (!dbUser?.isSeller) {
        redirect("/become-seller");
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <div className="container mx-auto px-4 py-16 max-w-lg">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2">List a New Product</h1>
                    <p className="text-muted-foreground">
                        Fill in the details below to showcase your craft to the world.
                    </p>
                </div>

                <div className="bg-card p-8 rounded-xl border shadow-sm">
                    <ListProductForm />
                </div>
            </div>
        </div>
    );
}
