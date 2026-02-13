"use client";

import { useActionState } from "react";
import { listProduct } from "@/app/actions/list-product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
    message: "",
    error: "",
};

const categories = ["Resin Art", "Crochet", "Paintings", "Pottery"];

export function ListProductForm() {
    // @ts-ignore
    const [state, formAction, isPending] = useActionState(listProduct, initialState);

    return (
        <form action={formAction} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="title">Product Title</Label>
                <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Blue Resin Necklace"
                    required
                    minLength={3}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Describe your handmade item..."
                    required
                    className="min-h-[100px]"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="price">Price (Rs.)</Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                        id="category"
                        name="category"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                    id="imageUrl"
                    name="imageUrl"
                    placeholder="https://example.com/image.jpg"
                />
                <p className="text-xs text-muted-foreground">
                    Use a direct link to your product image. (e.g. from Google Drive or a hosting site)
                </p>
            </div>

            {state?.error && (
                <p className="text-sm text-destructive font-medium">{state.error}</p>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Listing..." : "Post Product"}
            </Button>
        </form>
    );
}
