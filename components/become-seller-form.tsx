"use client";

import { useActionState } from "react";
import { becomeSeller } from "@/app/actions/become-seller"; // You'll need to update action signature
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Define the initial state type
const initialState = {
    message: "",
    error: "",
};

export function BecomeSellerForm() {
    // @ts-ignore - types for useActionState might be tricky with server actions currently
    const [state, formAction, isPending] = useActionState(becomeSeller, initialState);

    return (
        <form action={formAction} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="shopName">Shop Name</Label>
                <Input
                    id="shopName"
                    name="shopName"
                    placeholder="e.g. Ali's Pottery"
                    required
                    minLength={3}
                />
                <p className="text-xs text-muted-foreground">
                    This will be displayed on your profile and listings.
                </p>
            </div>

            {state?.error && (
                <p className="text-sm text-destructive font-medium">{state.error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Setting up..." : "Start Selling"}
            </Button>
        </form>
    );
}
