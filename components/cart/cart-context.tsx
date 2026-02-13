"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
    id: string;
    title: string;
    price: number;
    image: string | null;
    sellerName: string;
    quantity: number;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load cart from localStorage on init
    useEffect(() => {
        const savedCart = localStorage.getItem("craftisan-cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart from localStorage", e);
            }
        }
        setIsInitialized(true);
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("craftisan-cart", JSON.stringify(cart));
        }
    }, [cart, isInitialized]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((i) => i.id === item.id);
            if (existingItem) {
                return prevCart.map((i) =>
                    i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                );
            }
            return [...prevCart, item];
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
        );
    };

    const clearCart = () => setCart([]);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
