"use client";

import Link from "next/link";
import { UserNav } from "@/components/auth/user-nav";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { CartSheet } from "@/components/cart/cart-sheet";
import { useCart } from "@/components/cart/cart-context";

export function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const { totalItems } = useCart();

    return (
        <header className="border-b sticky top-0 bg-background/80 backdrop-blur-md z-40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-2xl text-primary hover:opacity-90 transition-opacity">
                    Craftisan
                </Link>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsCartOpen(true)}
                        className="relative p-2 hover:bg-muted rounded-full transition-colors group"
                        aria-label="Open cart"
                    >
                        <ShoppingBag className="h-6 w-6 text-foreground group-hover:text-primary transition-colors" />
                        {totalItems > 0 && (
                            <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                                {totalItems}
                            </span>
                        )}
                    </button>
                    <UserNav />
                </div>
            </div>
            <CartSheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </header>
    );
}
