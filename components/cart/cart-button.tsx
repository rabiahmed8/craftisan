"use client";

import { useCart, CartItem } from "./cart-context";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

interface AddToCartButtonProps {
    product: {
        id: string;
        title: string;
        price: number;
        images: string[];
        seller: {
            shopName: string | null;
            name: string | null;
        };
    };
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAdd = () => {
        const item: CartItem = {
            id: product.id,
            title: product.title,
            price: product.price,
            image: product.images[0] || null,
            sellerName: product.seller.shopName || product.seller.name || "Unknown Seller",
            quantity: 1,
        };
        addToCart(item);
        setIsAdded(true);
        setTimeout(() => setIsAdded(false), 2000);
    };

    return (
        <Button
            onClick={handleAdd}
            className={`w-full transition-all duration-300 ${isAdded ? "bg-green-600 hover:bg-green-700" : ""}`}
            disabled={isAdded}
            size="sm"
        >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isAdded ? "Added!" : "Add to Cart"}
        </Button>
    );
}
