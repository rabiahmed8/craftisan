import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let isSeller = false;
  if (user?.email) {
    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: { isSeller: true }
    });
    isSeller = dbUser?.isSeller || false;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-20 md:py-32 text-center container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Discover Pakistan's <span className="text-primary">Hidden Crafts</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            The premier marketplace for handmade treasures. From intricate resin art to traditional crochet, find unique pieces made with love in Pakistan.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="px-8" asChild>
              <Link href="/shop">Shop Now</Link>
            </Button>
            {isSeller ? (
              <Button size="lg" variant="outline" className="px-8" asChild>
                <Link href="/list-product">List a Product</Link>
              </Button>
            ) : (
              <Button size="lg" variant="outline" className="px-8" asChild>
                <Link href="/become-seller">Become a Seller</Link>
              </Button>
            )}
          </div>
        </section>

        {/* Featured Categories Placeholder */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Resin Art", "Crochet", "Paintings", "Pottery"].map((cat) => (
                <Link key={cat} href={`/shop?category=${encodeURIComponent(cat)}`} className="bg-card p-6 rounded-lg shadow-sm border text-center hover:shadow-md transition-shadow cursor-pointer block">
                  <h3 className="font-semibold">{cat}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Craftisan. Made with ❤️ in Pakistan.
      </footer>
    </div>
  );
}
