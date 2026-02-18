"use client";

import { Suspense } from "react";
import BozumForm from "@/components/features/BozumForm";

export default function BozumPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center text-foreground">Yükleniyor...</div>}>
            <BozumForm />
        </Suspense>
    );
}
