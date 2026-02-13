import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AllProductsGrid } from "@/components/sections/AllProductsGrid";

export default function KodUrunlerPage() {
    return (
        <div className="min-h-screen bg-[#080809] text-white">
            <Navbar />
            <AllProductsGrid />
            <Footer />
        </div>
    );
}
