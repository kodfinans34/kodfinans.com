"use client";

import { Suspense } from "react";
import BozumForm from "@/components/features/BozumForm";

export default function BozumPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#070d0b] flex items-center justify-center text-white">Yükleniyor...</div>}>
            <BozumForm />
        </Suspense>
    );
}
