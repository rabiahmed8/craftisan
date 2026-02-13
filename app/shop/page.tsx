import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { AddToCartButton } from "@/components/cart/cart-button";

interface ShopPageProps {
    searchParams: Promise<{
        category?: string;
    }>;
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
    const { category } = await searchParams;
    console.log("Current category filter:", category);

    const where = category ? { category } : {};

    const products = await prisma.product.findMany({
        where,
        include: {
            seller: {
                select: {
                    shopName: true,
                    name: true,
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const categories = ["Resin Art", "Crochet", "Paintings", "Pottery"];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="container mx-auto px-4 py-8 flex-1">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar / Filters */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-card border rounded-lg p-6 sticky top-24">
                            <h3 className="font-semibold text-lg mb-4">Categories</h3>
                            <div className="space-y-2">
                                <Link
                                    href="/shop"
                                    className={`block px-3 py-2 rounded-md transition-colors ${!category ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                                >
                                    All Products
                                </Link>
                                {categories.map((cat) => (
                                    <Link
                                        key={cat}
                                        href={`/shop?category=${encodeURIComponent(cat)}`}
                                        className={`block px-3 py-2 rounded-md transition-colors ${category === cat ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
                                    >
                                        {cat}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-3xl font-bold">
                                {category ? `${category}` : "All Products"}
                            </h1>
                            <span className="text-muted-foreground">
                                {products.length} {products.length === 1 ? 'result' : 'results'}
                            </span>
                        </div>

                        {products.length === 0 ? (
                            <div className="text-center py-20 bg-muted/30 rounded-lg border border-dashed">
                                <p className="text-muted-foreground text-lg mb-4">No products found in this category.</p>
                                <Button asChild variant="outline">
                                    <Link href="/shop">View All Products</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <div key={product.id} className="group border rounded-lg overflow-hidden hover:shadow-md transition-all">
                                        <div className="relative aspect-square bg-muted">
                                            {product.images[0] ? (
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-semibold truncate pr-2" title={product.title}>{product.title}</h3>
                                                <span className="font-bold text-primary">Rs. {product.price}</span>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                                {product.description}
                                            </p>
                                            <div className="mt-auto pt-4">
                                                <AddToCartButton product={product} />
                                            </div>
                                            <div className="flex justify-between items-center text-xs text-muted-foreground border-t mt-4 pt-3">
                                                <Link
                                                    href={`/seller/${product.sellerId}`}
                                                    className="font-medium hover:text-primary hover:underline transition-colors"
                                                >
                                                    {product.seller.shopName || product.seller.name || 'Unknown Seller'}
                                                </Link>
                                                <span className="bg-secondary px-2 py-0.5 rounded-full text-secondary-foreground">{product.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
