"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Home, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function CheckoutSuccessPage() {
    const { clearCart } = useCart();
    const [orderNumber] = useState(() => Math.floor(100000 + Math.random() * 900000));

    // Clear cart on success page load
    useEffect(() => {
        clearCart();
    }, [clearCart]);



    return (
        <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
            <div className="max-w-md w-full bg-card p-10 rounded-2xl border shadow-xl text-center">
                <div className="mb-6 flex justify-center">
                    <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                        <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                <p className="text-muted-foreground mb-6">
                    Thank you for your purchase. We've received your order and are processing it now.
                </p>

                <div className="bg-muted/50 p-4 rounded-lg border mb-8">
                    <div className="flex justify-between items-center text-sm mb-2">
                        <span className="text-muted-foreground">Order Number</span>
                        <span className="font-semibold">#CR-{orderNumber}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Status</span>
                        <span className="text-green-600 font-medium">Processing</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <Button asChild className="w-full py-6 text-lg">
                        <Link href="/shop">
                            <ShoppingBag className="h-5 w-5 mr-2" />
                            Continue Shopping
                        </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full py-6 text-lg">
                        <Link href="/">
                            <Home className="h-5 w-5 mr-2" />
                            Back to Home
                        </Link>
                    </Button>
                </div>

                <p className="mt-8 text-xs text-muted-foreground">
                    A confirmation email will be sent to your inbox shortly with full tracking details.
                </p>
            </div>
        </div>
    );
}
