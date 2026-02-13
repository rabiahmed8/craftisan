import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { BecomeSellerForm } from "@/components/become-seller-form";
import Link from "next/link";

export default async function BecomeSellerPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
        redirect("/login");
    }

    const dbUser = await prisma.user.findUnique({
        where: { email: user.email },
    });

    if (dbUser?.isSeller) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">You are already a Seller!</h1>
                <p className="text-muted-foreground mb-8">
                    Go to your dashboard to manage your listings.
                </p>
                <Button asChild>
                    <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16 max-w-md">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Become a Seller</h1>
                <p className="text-muted-foreground">
                    Start your journey as a Craftisan seller today.
                </p>
            </div>

            <div className="bg-card p-6 rounded-lg border shadow-sm">
                <BecomeSellerForm />
            </div>
        </div>
    );
}
