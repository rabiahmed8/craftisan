"use client";

import { useCart } from "./cart-context";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CartSheet({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isMounted) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Sheet */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-md bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <ShoppingBag className="h-5 w-5" /> Your Cart ({totalItems})
                        </h2>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Items */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {cart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                                    <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Your cart is empty</h3>
                                    <p className="text-muted-foreground">Looks like you haven't added anything yet.</p>
                                </div>
                                <Button asChild onClick={onClose} variant="outline">
                                    <Link href="/shop">Start Shopping</Link>
                                </Button>
                            </div>
                        ) : (
                            cart.map((item) => (
                                <div key={item.id} className="flex gap-4 group">
                                    <div className="relative h-20 w-20 rounded-lg bg-muted overflow-hidden flex-shrink-0 border">
                                        {item.image ? (
                                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                                        ) : (
                                            <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">No img</div>
                                        )}
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between py-0.5">
                                        <div>
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-semibold text-sm line-clamp-1">{item.title}</h4>
                                                <span className="font-bold text-sm">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground">{item.sellerName}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <div className="flex items-center border rounded-md">
                                                <button
                                                    className="p-1 hover:bg-muted text-muted-foreground"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                                                <button
                                                    className="p-1 hover:bg-muted text-muted-foreground"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>
                                            <button
                                                className="text-muted-foreground hover:text-destructive transition-colors"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cart.length > 0 && (
                        <div className="p-6 border-t bg-muted/20 space-y-4">
                            <div className="flex justify-between text-lg font-bold">
                                <span>Total</span>
                                <span>Rs. {totalPrice.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Taxes and shipping calculated at checkout.</p>
                            <Button className="w-full py-6 text-lg font-bold shadow-lg shadow-primary/20">
                                Checkout Now
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
