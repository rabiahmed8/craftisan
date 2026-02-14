"use client";

import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

export default function CheckoutPage() {
    const { cart, totalPrice, totalItems } = useCart();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate processing
        setTimeout(() => {
            router.push("/checkout/success");
        }, 1500);
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <p className="text-muted-foreground mb-8">Add some items before checking out.</p>
                <Button asChild>
                    <Link href="/shop">Go to Shop</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-muted/30 pb-20 pt-10">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <Link href="/shop" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Shop
                    </Link>
                    <h1 className="text-3xl font-bold mt-4">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left Side: Shipping Form */}
                    <div className="lg:col-span-7 space-y-8">
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
                            <section className="bg-card p-6 rounded-xl border shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <Truck className="h-5 w-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-semibold">Shipping Information</h2>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input id="firstName" placeholder="Ahmed" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input id="lastName" placeholder="Ali" required />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="ahmed@example.com" required />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="address">Street Address</Label>
                                        <Input id="address" placeholder="123 Main Street, Phase 6 DHA" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input id="city" placeholder="Lahore" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input id="phone" placeholder="0300-1234567" required />
                                    </div>
                                </div>
                            </section>

                            <section className="bg-card p-6 rounded-xl border shadow-sm">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <CreditCard className="h-5 w-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-semibold">Payment Method</h2>
                                </div>
                                <div className="p-4 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/30 text-center">
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Real payment integration (JazzCash, EasyPaisa, or Stripe) will be added here.
                                    </p>
                                    <div className="flex items-center justify-center gap-4 text-xs font-medium opacity-50 grayscale">
                                        <div className="flex flex-col items-center">
                                            <div className="h-8 w-12 bg-card border rounded mb-1" />
                                            <span>JazzCash</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="h-8 w-12 bg-card border rounded mb-1" />
                                            <span>EasyPaisa</span>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="h-8 w-12 bg-card border rounded mb-1" />
                                            <span>Credit Card</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </form>
                    </div>

                    {/* Right Side: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-card p-6 rounded-xl border shadow-sm sticky top-10">
                            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative h-16 w-16 rounded-lg bg-muted overflow-hidden border flex-shrink-0">
                                            {item.image ? (
                                                <Image src={item.image} alt={item.title} fill className="object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-[10px] text-muted-foreground">No img</div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
                                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-sm font-semibold">
                                            Rs. {(item.price * item.quantity).toLocaleString()}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 py-4 border-t">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                                    <span>Rs. {totalPrice.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="text-green-600 font-medium">Free</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-3 border-t">
                                    <span>Total</span>
                                    <span>Rs. {totalPrice.toLocaleString()}</span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                form="checkout-form"
                                className="w-full py-6 text-lg font-bold mt-6"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Processing..." : "Place Order"}
                            </Button>

                            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                <ShieldCheck className="h-4 w-4 text-green-600" />
                                Secure Checkout - Craftisan Handcrafted Items
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
