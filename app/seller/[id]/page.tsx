import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/cart-button";

interface SellerProfilePageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function SellerProfilePage({ params }: SellerProfilePageProps) {
    const { id } = await params;

    const seller = await prisma.user.findUnique({
        where: { id },
        include: {
            products: {
                orderBy: {
                    createdAt: 'desc'
                }
            }
        }
    });

    if (!seller || !seller.isSeller) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="mb-12 border-b pb-8">
                    <div className="flex items-center gap-6 mb-4">
                        <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
                            {seller.shopName?.[0] || seller.name?.[0] || 'S'}
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold text-foreground mb-1">
                                {seller.shopName || seller.name || 'Seller Profile'}
                            </h1>
                            <p className="text-muted-foreground">
                                Member since {new Date(seller.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-4 text-sm">
                        <div className="bg-secondary/50 px-3 py-1 rounded-full text-secondary-foreground font-medium">
                            {seller.products.length} {seller.products.length === 1 ? 'Product' : 'Products'}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {seller.products.map((product) => (
                        <div key={product.id} className="group border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-card">
                            <div className="relative aspect-square bg-muted overflow-hidden">
                                {product.images[0] ? (
                                    <Image
                                        src={product.images[0]}
                                        alt={product.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted-foreground italic">
                                        No Image
                                    </div>
                                )}
                                <div className="absolute top-3 right-3">
                                    <span className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold shadow-sm">
                                        {product.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-lg mb-2 truncate group-hover:text-primary transition-colors" title={product.title}>
                                    {product.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
                                    {product.description}
                                </p>
                                <div className="mb-4">
                                    <AddToCartButton
                                        product={{
                                            ...product,
                                            seller: {
                                                shopName: seller.shopName,
                                                name: seller.name
                                            }
                                        }}
                                    />
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t">
                                    <span className="font-extrabold text-xl text-foreground">
                                        Rs. {product.price.toLocaleString()}
                                    </span>
                                    <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {seller.products.length === 0 && (
                    <div className="text-center py-24 bg-muted/20 rounded-2xl border-2 border-dashed">
                        <p className="text-muted-foreground text-xl">
                            This seller hasn't listed any products yet.
                        </p>
                    </div>
                )}
            </main>
        </div>
    );
}
